import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { VendorServiceService } from '../../../../vendor/services/vendor-service.service';
import { Vendor } from '../../../../apiTypes/vendor';
import { FinancialOperationsService } from '../../../services/financial-operations.service';
import { ActivatedRoute, Router } from '@angular/router';
import { PayIn } from '../../../../apiTypes/ApiTypes';
import { AlertService } from '../../../../shared/services/alert.service';
import { ALERT_TYPE } from '../../../../shared/models/alert';
import { AuthService } from '../../../../auth/services/auth.service';
import { RepoResponse } from '../../../../apiTypes/RepoResponse';
import { IncomeType } from '../../../../apiTypes/incomeType';
import { CurrencyCode } from 'src/app/apiTypes/currencycode';
import { CurrencyCodeService } from 'src/services/currency-code.service';

@Component({
  selector: 'app-pay-ins-form',
  templateUrl: './pay-ins-form.component.html',
  styleUrl: './pay-ins-form.component.scss',
})
export class PayInsFormComponent implements OnInit {
  payInForm!: FormGroup;
  vendors!: Vendor[];
  isEdit: boolean = false; // Flag for edit mode
  payInId!: number; // Store the pay-in ID for edit mode
  incomeTypes!: IncomeType[];
  localPayInForEdit!: PayIn;
  currencies !: CurrencyCode[]; 
  isLoading:boolean=false;
  constructor(
    private fb: FormBuilder,
    private vendorService: VendorServiceService,
    private financialOpsService: FinancialOperationsService,
    private alertService: AlertService,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private currencyCodeService: CurrencyCodeService,
  ) {}

  ngOnInit(): void {
    this.initializeForm();
    this.loadVendors();
    this.loadIncomeTypes();
    this.currencies = this.currencyCodeService.getCurrencyCodes();
    // Check if this is an edit route
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {
        this.isEdit = true; // Set the flag to true for editing
        this.isLoading=true;
        this.payInId = +id; // Store the pay-in ID
        this.loadPayInDetails(this.payInId); // Fetch PayIn details        
      }
    });
  }

  // Initialize the form
  initializeForm() {
    this.payInForm = this.fb.group({
      incomeTypeId: ['', Validators.required],
      amount: [0, [Validators.required, Validators.min(0.01)]],
      currencyCode: ['', Validators.required],
      description: ['', Validators.required],
      paidOn: ['', Validators.required],
      vendorId: [''], // Vendor is optional
    });
  }

  // Load the vendors for the dropdown
  loadVendors() {
    this.vendorService.getVendors().subscribe({
      next: (vendors) => {
        this.vendors = vendors.data;
      },
      error: (err) => {
        console.error('Error fetching vendors', err);
      },
    });
  }

  // Load the vendors for the dropdown
  loadIncomeTypes() {
    this.financialOpsService.getIncomeTypes().subscribe({
      next: (incomeTypes) => {
        this.incomeTypes = incomeTypes.data;
        this.isLoading=false;
      },
      error: (err) => {
        console.error('Error fetching vendors', err);
      },
    });
  }

  // Load PayIn details if editing
  loadPayInDetails(id: number) {
    this.financialOpsService.getPayInDetails(id).subscribe({
      next: (payIn: RepoResponse<PayIn>) => {
        this.populateForm(payIn.data);
        this.localPayInForEdit = payIn.data;
      },
      error: (err) => {
        console.error('Error loading PayIn details', err);
      },
    });
  }

  // Populate the form with the data from the PayIn object
  populateForm(payIn: PayIn) {
    this.payInForm.patchValue({
      incomeTypeId: payIn.incomeTypeId,
      amount: payIn.amount,
      currencyCode: payIn.currencyCode,
      description: payIn.description,
      paidOn: payIn.paidOn,
      vendorId: payIn.vendorId,
    });
  }

  // Handle form submission
  onSubmit() {
    if (this.payInForm.invalid) {
      this.payInForm.markAllAsTouched();
      return;
    }

    const payIn: PayIn = {
      ...this.payInForm.value,
      payInId: this.isEdit ? this.payInId : 0, // If editing, retain the payInId
      createdOn: this.isEdit ? this.localPayInForEdit.createdOn : new Date(),
      createdBy: this.isEdit
        ? this.localPayInForEdit.createdBy
        : this.authService.getCurrentUser().userName,
      lastUpdatedOn: new Date(),
      lastUpdatedBy: this.authService.getCurrentUser().userName,
    };

    if (this.isEdit) {
      this.editPayIn(payIn);
    } else {
      this.createPayIn(payIn);
    }
  }

  // Create a new PayIn
  createPayIn(payIn: PayIn) {
    this.financialOpsService.createPayIn(payIn).subscribe({
      next: (response) => {
        if (response.success) {
          this.alertService.alert(
            'Pay-In created successfully!',
            ALERT_TYPE.SUCCESS
          );
          this.goToPayInsPage();
        } else {
          this.alertService.alert(response.errors, ALERT_TYPE.ERROR);
        }
      },
      error: (err) => {
        console.error('Error creating Pay-In', err);
        this.alertService.alert('Failed to create Pay-In.', ALERT_TYPE.ERROR);
      },
    });
  }

  goToPayInsPage() {
    this.router.navigate(['billing'], {
      queryParams: { tab: 'payIns' },
    });
  }
  // Edit an existing PayIn
  editPayIn(payIn: PayIn) {
    this.financialOpsService.editPayIn(payIn).subscribe({
      next: (response) => {
        if (response.success) {
          this.alertService.alert(
            'Pay-In updated successfully!',
            ALERT_TYPE.SUCCESS
          );
          this.goToPayInsPage();
        } else {
          this.alertService.alert(response.errors, ALERT_TYPE.ERROR);
        }
      },
      error: (err) => {
        console.error('Error updating Pay-In', err);
        this.alertService.alert('Failed to update Pay-In.', ALERT_TYPE.ERROR);
      },
    });
  }
}
