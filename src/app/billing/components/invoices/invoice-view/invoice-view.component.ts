import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FinancialOperationsService } from '../../../services/financial-operations.service';
import { InvoiceDto } from '../../../../apiTypes/ApiTypes';
import { RepoResponse } from '../../../../apiTypes/RepoResponse';
import { VendorServiceService } from '../../../../vendor/services/vendor-service.service';
import { Vendor } from '../../../../apiTypes/vendor';

@Component({
  selector: 'app-invoice-view',
  templateUrl: './invoice-view.component.html',
  styleUrl: './invoice-view.component.scss', // Corrected styleUrls typo
})
export class InvoiceViewComponent implements OnInit {
  invoiceDto!: InvoiceDto; // Store the invoice details
  loading: boolean = true; // Show loader while data is being fetched
  invoiceId!: number; // Store the invoice ID from the URL
  vendor!: Vendor;
  totalAmount:any;

  constructor(
    private financialOpsService: FinancialOperationsService,
    private vendorService: VendorServiceService,
    private route: ActivatedRoute // Inject ActivatedRoute to get URL params
  ) {}

  ngOnInit(): void {
    // Get the invoiceId from the route parameters
    this.route.paramMap.subscribe((params) => {
      this.invoiceId = parseInt(params.get('id') ?? ''); // 'id' is the name of the route param

      if (this.invoiceId) {
        // Fetch the invoice details with the invoiceId
        this.getInvoiceDetails(this.invoiceId);
      }
    });
  }

  // Fetch the invoice details
  getInvoiceDetails(invoiceId: number): void {
    this.financialOpsService.getInvoiceDetails(invoiceId).subscribe({
      next: (data: RepoResponse<InvoiceDto>) => {
        this.invoiceDto = data.data; // Store the data
        this.vendorService
          .getvendorById(this.invoiceDto.invoice.vendorId)
          .subscribe({
            next: (res: RepoResponse<Vendor>) => {
              this.vendor = res.data;
            },
          });
          this.getTotalPrice();
        this.loading = false; // Hide loader
      },
      error: (err) => {
        console.error('Error fetching invoice details', err);
        this.loading = false; // Hide loader in case of error
      },
    });
  }
  getTotalPrice()
  {
    if (this.invoiceDto && this.invoiceDto.invoiceItems) {
      this.totalAmount = this.invoiceDto.invoiceItems.reduce((total, item) => {
        const itemTotal = (item.qty || 0) * (item.itemPrice || 0); // Ensure default to 0 if undefined
        return total + itemTotal;
      }, 0);
    }
  }
}
