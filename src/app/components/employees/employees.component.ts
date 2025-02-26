import { Component, OnInit } from '@angular/core';
import { EmployeePerson } from '../../apiTypes/employee';
import { EmployeeService } from '../../../services/employee.service';
import { NzModalService } from 'ng-zorro-antd/modal';
import { Router } from '@angular/router';

import { AppResourceServiceService } from '../../../services/app-resource-service.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { RepoResponse } from '../../apiTypes/RepoResponse';
import { ConfirmationService } from '../../shared/services/confirmation.service';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrl: './employees.component.css',
})
export class EmployeesComponent implements OnInit {
  employees: EmployeePerson[] = [];
  isVisible: boolean = false;
  isLoading = true;

  constructor(
    private employeeservice: EmployeeService,
    private modal: NzModalService,
    private router: Router,
    private message: NzMessageService,
    private resourceService: AppResourceServiceService,
    private confirmationService: ConfirmationService
  ) {}
  ngOnInit(): void {
    this.employeeservice.getEmployees().subscribe({
      next: (response: RepoResponse<EmployeePerson[]>) => {
        if (response.success) {
          this.employees = response.data;
          this.isLoading = false;
        }
      },
      error: (err) => {
        this.isLoading = false;
      },
    });
  }
  showModal(): void {
    this.isVisible = true;
  }

  handleCancel(): void {
    this.isVisible = false;
  }
  // onDelete(student: any): void {
  //   this.confirmationService
  //     .confirmDelete(
  //       'Confirm Delete',
  //       'Are you sure you want to delete this item?'
  //     )
  //     .subscribe((confirmed) => {
  //       if (confirmed) {
  //         this.deleteEmployee(student.id);
  //       }
  //     });
  // }
  editEmployee(employeeId: number): void {
    this.router.navigate(['/employee/edit', employeeId]);
  }

  deleteEmployee(employeeId: number): void {
    this.employeeservice.deleteEmployee(employeeId).subscribe(
      (response) => {
        this.employees = this.employees.filter((s) => s.id !== employeeId);
      },
      (error) => {
        this.message.error('Failed to delete data. Please try again.');
      }
    );
  }

  viewEmployee(employeeId: number): void {
    this.router.navigate(['employee/view', employeeId]);
  }
}
