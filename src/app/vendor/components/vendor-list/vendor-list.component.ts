import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Vendor } from '../../../apiTypes/vendor';
import { MatTableDataSource } from '@angular/material/table';
import { VendorServiceService } from '../../services/vendor-service.service';
import { ConfirmationService } from '../../../shared/services/confirmation.service';
import { RepoResponse } from '../../../apiTypes/RepoResponse';
import Swal from 'sweetalert2';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-vendor-list',
  templateUrl: './vendor-list.component.html',
  styleUrl: './vendor-list.component.scss',
})
export class VendorListComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  selectedRows = new SelectionModel<any>(true, []);
  vendors!: MatTableDataSource<Vendor>;
  isVisible: boolean = false;
  isLoading = true;
  constructor(private readonly router: Router, private route: ActivatedRoute,
    private confirmationService: ConfirmationService,
    private vendorServiceService: VendorServiceService,) { }
  columns: string[] = [
    'select',
    'name',
    'description',
    'phoneNumber',
    'countryCode',
    'contactPersonName',
    'actions',
  ];
  ngOnInit(): void {
    this.getAllVendors();
  }
  getAllVendors() {
    this.vendorServiceService.getVendors().subscribe({
      next: (response: RepoResponse<Vendor[]>) => {
        if (response.success) {
          this.vendors = new MatTableDataSource(response.data);
          this.vendors.paginator = this.paginator; 
          this.isLoading = false;          
        }
      },
      error: (err) => {
        this.isLoading = false;
      },
    });
  }
  handleCancel(): void {
    this.isVisible = false;
  }
  createVendor() {
    this.router.navigate([`create`], { relativeTo: this.route });
  }
  editVendor(id: number): void {
    
    this.router.navigate([`edit/${id}`], { relativeTo: this.route });
  }

  viewVendor(id: number): void {
    this.router.navigate(['view', id], { relativeTo: this.route });
  }
  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selectedRows.clear();
      return;
    }

    this.selectedRows.select(...this.vendors.data);
  }
  isAllSelected() {
    const numSelected = this.selectedRows.selected.length;
    const numRows = this.vendors.data.length;
    return numSelected === numRows;
  }
  filterData(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.vendors.filter = filterValue;

    if (this.vendors.paginator) {
      this.vendors.paginator.firstPage();
    }
  }
  selectVendor(id: string) {
    this.router.navigate([id], { relativeTo: this.route });
  }

  deleteVendor(id: any) {
    this.confirmationService.confirmDelete().then((result: any) => {
      if (result.isConfirmed) {
        this.vendorServiceService.deletevendor(id).subscribe(
          (response) => {
            Swal.fire('Deleted!', 'Your data has been deleted.', 'success');
            this.getAllVendors();
          },
          (error) => {
            Swal.fire(
              'Error!',
              'Failed to delete data. Please try again.',
              'error'
            );
          }
        );
      } else if (result.isDismissed) {
        Swal.fire('Cancelled', 'Delete Cancelled', 'error');
      }
    });
  }
  // Function to delete multiple classrooms
  deleteSelectedVendor(): void {
    let selectedIds = this.selectedRows.selected.map((row) => row.vendorId);
    if (selectedIds.length > 0) this.deleteVendor(selectedIds);
    this.selectedRows.clear(); // Clear the selection
  }

}
