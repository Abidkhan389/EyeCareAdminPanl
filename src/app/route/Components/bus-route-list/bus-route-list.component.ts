import { SelectionModel } from '@angular/cdk/collections';
import { Component, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService } from '../../../shared/services/confirmation.service';
import { BusRouteService } from '../../Services/bus-route.service';
import { RepoResponse } from '../../../apiTypes/RepoResponse';
import Swal from 'sweetalert2';
import { MatPaginator } from '@angular/material/paginator';
@Component({
  selector: 'app-bus-route-list',
  templateUrl: './bus-route-list.component.html',
  styleUrl: './bus-route-list.component.scss'
})
export class BusRouteListComponent {
  selectedRows = new SelectionModel<any>(true, []);
  BusRoutes!: MatTableDataSource<any>;
  isVisible: boolean = false;
  isLoading = true;
  @ViewChild(MatPaginator) paginator!: MatPaginator; 
  constructor(private readonly router: Router, private route: ActivatedRoute,
    private confirmationService: ConfirmationService,
    private BusRouteService: BusRouteService) {

  }
  columns: string[] = [
    'select',
    'routeName',
    'description',
    'departureTime',
    'finishTime',
    'statusName',
    'currentLocation',
    'actions',
  ];
  ngOnInit(): void {
    this.getAllBusRoutes();
  }
  getAllBusRoutes() {
    this.BusRouteService.getBusRoutes().subscribe({
      next: (response: RepoResponse<any[]>) => {
        if (response.success) {
          this.BusRoutes = new MatTableDataSource(response.data);
          this.BusRoutes.paginator = this.paginator; 
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
  createBusRoutes() {
    this.router.navigate([`create`], { relativeTo: this.route });
  }
  editBusRoutes(id: number): void {
    
    this.router.navigate([`edit/${id}`], { relativeTo: this.route });
  }

  viewBusRoutes(id: number): void {
    this.router.navigate(['view', id], { relativeTo: this.route });
  }
  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selectedRows.clear();
      return;
    }

    this.selectedRows.select(...this.BusRoutes.data);
  }
  isAllSelected() {
    const numSelected = this.selectedRows.selected.length;
    const numRows = this.BusRoutes.data.length;
    return numSelected === numRows;
  }
  filterData(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.BusRoutes.filter = filterValue;

    if (this.BusRoutes.paginator) {
      this.BusRoutes.paginator.firstPage();
    }
  }
  selectVendor(id: string) {
    this.router.navigate([id], { relativeTo: this.route });
  }

  deleteBusRoute(id: any) {
    this.confirmationService.confirmDelete().then((result: any) => {
      if (result.isConfirmed) {
        this.BusRouteService.deleteBusRoute(id).subscribe(
          (response) => {
            Swal.fire('Deleted!', 'Your data has been deleted.', 'success');
            this.getAllBusRoutes();
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
  deleteSelectedBusRoutes(): void {
    let selectedIds = this.selectedRows.selected.map((row) => row.vendorId);
    if (selectedIds.length > 0) this.deleteBusRoute(selectedIds);
    this.selectedRows.clear(); // Clear the selection
  }


}
