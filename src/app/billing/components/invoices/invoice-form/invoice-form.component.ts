import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { InvoiceDto, PayOut } from '../../../../apiTypes/ApiTypes';
import { VendorServiceService } from '../../../../vendor/services/vendor-service.service';
import { Vendor } from '../../../../apiTypes/vendor';
import { FinancialOperationsService } from '../../../services/financial-operations.service';
import { AlertService } from '../../../../shared/services/alert.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ALERT_TYPE } from '../../../../shared/models/alert';
import { AuthService } from '../../../../auth/services/auth.service';

@Component({
  selector: 'app-invoice-form',
  templateUrl: './invoice-form.component.html',
  styleUrl: './invoice-form.component.scss',
})
export class InvoiceFormComponent implements OnInit {
  invoiceForm!: FormGroup;
  vendors!: Vendor[];
  private _amount = 0;
  isEdit: boolean = false; // Flag to check if editing an existing invoice
  invoiceId!: number; // Store the invoice ID
  invoiceDtoLocal!: InvoiceDto;
  isLoading: boolean = false;
  constructor(
    private fb: FormBuilder,
    private vendorService: VendorServiceService,
    private financeService: FinancialOperationsService,
    private alertService: AlertService,
    private route: ActivatedRoute, // Used to get the route parameters
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.initializeForm();
    this.vendorService.getVendors().subscribe((x) => {
      this.vendors = x.data;
    });

    // Check if this is an edit route by checking for the invoice ID in the URL
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {
        this.isEdit = true; // Set the flag to true for editing
        this.invoiceId = +id; // Store the invoice ID
        this.isLoading=true;
        this._getInvoiceDetails(this.invoiceId); // Fetch invoice details to populate the form
      }
    });

    // Recalculate the invoice amount whenever the invoice items change
    this.invoiceItems.valueChanges.subscribe(() => {
      this.calculateInvoiceAmount();
    });
  }

  // Initialize the form
  initializeForm() {
    this.invoiceForm = this.fb.group({
      vendorInvoiceNumber: ['', Validators.required],
      vendorId: ['', Validators.required],
      amount: [{ value: this._amount, disabled: true }, Validators.required], // Disabled amount
      dueDate: ['', Validators.required],
      vendorInvoiceId: [0], // Hidden value to submit on edit
      invoiceItems: this.fb.array([this.createInvoiceItem()]), // Start with one invoice item
    });
    //this.isLoading = false;
  }

  // Create a form group for each Invoice Item
  createInvoiceItem(): FormGroup {
    const itemGroup = this.fb.group({
      invoiceItemId: [0], // Hidden value to submit on eidt
      itemName: ['', Validators.required],
      qty: [1, Validators.required],
      itemPrice: [0, Validators.required],
      itemsTotal: [{ value: 0 }, Validators.required], // Disabled itemsTotal
    });

    // Calculate item total when quantity or item price changes
    itemGroup.get('qty')?.valueChanges.subscribe(() => {
      this.calculateItemTotal(itemGroup);
    });
    itemGroup.get('itemPrice')?.valueChanges.subscribe(() => {
      this.calculateItemTotal(itemGroup);
    });

    return itemGroup;
  }

  // Calculate the total for a specific item
  calculateItemTotal(itemGroup: FormGroup) {
    const qty = itemGroup.get('qty')?.value || 0;
    const itemPrice = itemGroup.get('itemPrice')?.value || 0;
    const total = qty * itemPrice;
    itemGroup.get('itemsTotal')?.setValue(total);
  }

  // Calculate the total amount for all invoice items
  calculateInvoiceAmount() {
    const invoiceItems = this.invoiceItems.controls;
    let totalAmount = 0;
    invoiceItems.forEach((item) => {
      totalAmount += item.get('itemsTotal')?.value || 0;
    });
    this.invoiceForm.get('amount')?.setValue(totalAmount);
  }

  // Add another Invoice Item
  addInvoiceItem() {
    this.invoiceItems.push(this.createInvoiceItem());
  }

  // Get Invoice Items as a FormArray
  get invoiceItems(): FormArray {
    return this.invoiceForm.get('invoiceItems') as FormArray;
  }

  // Handle form submission
  onSubmit(payNow: boolean) {
    if (this.invoiceForm.invalid) {
      this.invoiceForm.markAllAsTouched();
      return;
    }
    this.calculateInvoiceAmount();
    const invoiceDto: InvoiceDto = {
      invoice: this.invoiceForm.value,
      invoiceItems: this.invoiceForm.value.invoiceItems,
      payOut: payNow ? this.createPayOutObject() : undefined,
    };

    invoiceDto.invoice.createdBy = this.authService.getCurrentUser().userName;
    invoiceDto.invoice.invoiceScanImage = ''; // TODO: Add file upload
    invoiceDto.invoice.lastUpdatedBy =
      this.authService.getCurrentUser().userName;

    if (this.isEdit) {
      this.updateInvoice(invoiceDto);
    } else {
      this.createInvoice(invoiceDto);
    }
  }

  // Fetch the invoice details if editing
  _getInvoiceDetails(id: number) {
    this.financeService.getInvoiceDetails(id).subscribe((res) => {
      this.populateForm(res.data);
      this.invoiceDtoLocal = res.data;
      this.isLoading = false;
    });
  }

  // Populate the form with the data from the invoiceDto
  populateForm(invoiceDto: InvoiceDto) {
    this.invoiceForm.patchValue({
      vendorInvoiceNumber: invoiceDto.invoice.vendorInvoiceNumber,
      vendorId: invoiceDto.invoice.vendorId,
      amount: invoiceDto.invoice.amount,
      dueDate: invoiceDto.invoice.dueDate,
      vendorInvoiceId: invoiceDto.invoice.vendorInvoiceId,
    });

    this.invoiceItems.clear();
    invoiceDto.invoiceItems.forEach((item) => {
      const itemGroup = this.createInvoiceItem();
      itemGroup.patchValue({
        itemName: item.itemName,
        qty: item.qty,
        itemPrice: item.itemPrice,
        itemsTotal: item.itemsTotal,
        invoiceItemId: item.invoiceItemId,
      });
      this.invoiceItems.push(itemGroup);
      this.calculateItemTotal(itemGroup);
    });
  }

  // Create a new invoice
  createInvoice(invoiceDto: InvoiceDto) {
    this.financeService.createNewInvoice(invoiceDto).subscribe((x) => {
      if (x.success) {
        this.alertService.alert(
          'Invoice added successfully!',
          ALERT_TYPE.SUCCESS
        );
        this.router.navigate(['/billing'], {
          queryParams: { tab: 'invoices' },
        });
      } else {
        this.alertService.alert(x.errors, ALERT_TYPE.ERROR);
      }
    });
  }

  // Update an existing invoice
  updateInvoice(invoiceDto: InvoiceDto) {
    this.financeService.updateInvoice(invoiceDto).subscribe((x) => {
      if (x.success) {
        this.alertService.alert(
          'Invoice updated successfully!',
          ALERT_TYPE.SUCCESS
        );
        this.router.navigate(['main/billing'], {
          queryParams: { tab: 'invoices' },
        });
      } else {
        this.alertService.alert(x.errors, ALERT_TYPE.ERROR);
      }
    });
  }

  // Create the PayOut object if the "Create and Pay Now" button is clicked
  createPayOutObject(): PayOut {
    return {
      payOutId: this.isEdit ? this.invoiceDtoLocal?.payOut?.payOutId ?? 0 : 0,
      invoiceId: 0,
      amount: this.invoiceForm.get('amount')?.value,
      description: 'Pay in full upon creation',
      overrideNoInvoice: false,
      overrideReason: 'Paid in full now',
      paidOn: new Date(),
      paidBy: this.authService.getCurrentUser().userName,
    };
  }
  // Method to remove a question FormGroup
  removeQuestion(index: number): void {
    this.invoiceItems.removeAt(index);
  }
}
