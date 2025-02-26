import { Component } from '@angular/core';
import { Vendor } from '../../../apiTypes/vendor';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { VendorServiceService } from '../../services/vendor-service.service';

@Component({
  selector: 'app-vendor-view',
  templateUrl: './vendor-view.component.html',
  styleUrl: './vendor-view.component.scss'
})
export class VendorViewComponent {
  vendor!: Vendor | undefined;
  isLoading = true;
  isreadOnly= false;
  vendorData:any;
  constructor(
    private route: ActivatedRoute,
    private vendorService:VendorServiceService ,
    private message: MatSnackBar,
  ) {
   
  }
  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const id = +params['id']; // Get employee ID from the route
      this.loadVendorDetails(id);
    });
  }

  loadVendorDetails(id: number): void {
    this.vendorService.getvendorById(id).subscribe({
      next: (response) => {
        //this.employee = response.data; // Assign the fetched employee data
       this.vendorData=response.data;
        this.isreadOnly = true;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error fetching vendor details:', err);
        this.isLoading = false;
      },
    });
  }
}
