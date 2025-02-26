import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeePerson } from '../../../apiTypes/employee';
import {EmployeeService} from '../../services/employee.service';
import { AppResourceServiceService } from '../../../../services/app-resource-service.service';
import { ConfirmationService } from '../../../shared/services/confirmation.service';
import { RepoResponse } from '../../../apiTypes/RepoResponse';
import Swal from 'sweetalert2';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-List.component.html',
  styleUrl: './employee-list.component.scss',
})
export class EmployeeListComponent implements OnInit {
  // employees: EmployeePerson[] = [];
  selectedRows = new SelectionModel<EmployeePerson>(true, []);
  employees!: MatTableDataSource<EmployeePerson>;
  isVisible: boolean = false;
  isLoading = true;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  
  columns: string[] = [
    'select',
    'firstName',
    'phoneNumber',
    'yearsOfExperience',
    'actions',
  ];
  constructor(
    private employeeservice: EmployeeService,
    private router: Router,
    private route: ActivatedRoute,
    private resourceService: AppResourceServiceService,
    private confirmationService: ConfirmationService
  ) {}
  ngOnInit(): void {
    this.getAllEmployees();
  }

  getAllEmployees() {
    this.employeeservice.getEmployees().subscribe({
      next: (response: RepoResponse<EmployeePerson[]>) => {
        if (response.success) {
          this.employees = new MatTableDataSource(response.data);
          this.employees.paginator = this.paginator; 
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
  createEmployee() {
    this.router.navigate(['create'], { relativeTo: this.route });
  }
  editEmployee(id: number): void {
    this.router.navigate([`edit/${id}`], { relativeTo: this.route });
  }

  viewEmployee(id: number): void {
    this.router.navigate(['profile', id], { relativeTo: this.route });
  }
  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selectedRows.clear();
      return;
    }

    this.selectedRows.select(...this.employees.data);
  }
  isAllSelected() {
    const numSelected = this.selectedRows.selected.length;
    const numRows = this.employees.data.length;
    return numSelected === numRows;
  }
  filterData(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.employees.filter = filterValue;

    if (this.employees.paginator) {
      this.employees.paginator.firstPage();
    }
  }
  selectEmployee(id: string) {
    this.router.navigate([id], { relativeTo: this.route });
  }
  

  deleteEmployee(id: any) {
    this.confirmationService.confirmDelete().then((result: any) => {
      if (result.isConfirmed) {
        this.employeeservice.deleteEmployee(id).subscribe(
          (response) => {
            Swal.fire('Deleted!', 'Your data has been deleted.', 'success');
            this.getAllEmployees();
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
  deleteSelectedEmployees(): void {
    let selectedIds = this.selectedRows.selected.map((row) => row.id);
    if (selectedIds.length > 0) this.deleteEmployee(selectedIds);
    this.selectedRows.clear(); // Clear the selection
  }
}

