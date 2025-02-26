import { Component, OnInit, ViewChild } from '@angular/core';
import { SalaryPayments } from '../../../apiTypes/ApiTypes';
import { FinancialOperationsService } from '../../services/financial-operations.service';
import { EmployeeService } from '../../../employee/services/employee.service';
import { RepoResponse } from '../../../apiTypes/RepoResponse';
import { EmployeePerson } from '../../../apiTypes/employee';
import { Router } from '@angular/router';
import { SelectionModel } from '@angular/cdk/collections';
import { ConfirmationService } from 'src/app/shared/services/confirmation.service';
import Swal from 'sweetalert2';
import { AuthService } from 'src/app/auth/services/auth.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PayrollViewComponent } from './payroll-view/payroll-view.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-payroll-dashboard',
  templateUrl: './payroll-dashboard.component.html',
  styleUrls: ['./payroll-dashboard.component.scss'],
})
export class PayrollDashboardComponent implements OnInit {
  employees: EmployeePerson[] = [];
  selectedEmployeeId: any;
  //payHistory: SalaryPayments[] = []; // Used as the data source in the template
  payHistory = new MatTableDataSource<SalaryPayments>([]);
  displayedColumns: string[] = [
    'select',
    'salaryPaymentsId',
    'employeeId',
    'paymentAmount',
    'forPayPeriod',
    'paidOn',
    'paidBy',
    'actions',
  ];
  selectedRows = new SelectionModel<SalaryPayments>(true, []); // Manages row selections
  taxesAndSsnDeductions: any = null;
  benefitsAndLeave: any = null;
  isAdminOrSuperAdmin = false; // Boolean to determine if the user is an Admin/Super Admin
  currentUser!: any;
  @ViewChild(MatPaginator) paginator!: MatPaginator; 
  payRollViewData:any;
  constructor(
    private financialOperationsService: FinancialOperationsService,private authService: AuthService,
    private employeeService: EmployeeService,private confirmationService: ConfirmationService,private dialog: MatDialog,
    private router: Router,private financialOpService: FinancialOperationsService,private message: MatSnackBar,
  ) {}

  ngOnInit(): void {
    this.loadEmployees();
    this.checkUserRole();
  }
  checkUserRole() {
    // Logic to set `isAdminOrSuperAdmin` based on the user role
    this.currentUser = this.authService.getCurrentUser();
    const roles = this.currentUser.roles;
    if (roles.includes('ADMIN') || roles.includes('SUPERADMIN')) {
       this.isAdminOrSuperAdmin = true;
    }
  }

  // Load employees for selection
  loadEmployees(): void {
    this.employeeService
      .getEmployees()
      .subscribe((employees: RepoResponse<EmployeePerson[]>) => {
        this.employees = employees.data;
        this.payHistory.paginator = this.paginator;
      });
  }

  // Triggered when selecting an employee to load their payroll details
  onEmployeeSelect(employeeId: number): void {
    this.selectedEmployeeId = employeeId;
    this.loadPayHistory(employeeId);
    this.loadTaxesAndSsnDeductions(employeeId);
    this.loadBenefitsAndLeave(employeeId);
  }

  // Load payroll history for the selected employee
  loadPayHistory(employeeId: number): void {
    this.financialOperationsService
      .getPayHistory(employeeId)
      .subscribe((history: RepoResponse<SalaryPayments[]>) => {
        this.payHistory =new MatTableDataSource(history.data);
        this.selectedRows.clear(); // Clear selections when loading new data
      });
  }

  // Load tax and SSN deductions
  loadTaxesAndSsnDeductions(employeeId: number): void {
    this.financialOperationsService
      .getTaxesAndSsnDeductions(employeeId)
      .subscribe((data: any) => {
        this.taxesAndSsnDeductions = data;
      });
  }

  // Load benefits and leave information
  loadBenefitsAndLeave(employeeId: number): void {
    this.financialOperationsService
      .getEmployeeBenefits(employeeId)
      .subscribe((data: any) => {
        this.benefitsAndLeave = data;
      });
  }

  // Retrieve Salary Payment details when ID is clicked
  getSalaryPaymentDetails(salaryPaymentsId: number): void {
    // this.financialOperationsService
    //   .getSalaryPaymentDetails(salaryPaymentsId)
    //   .subscribe((response: RepoResponse<SalaryPayments>) => {
    //     console.log('Salary Payment Details:', response.data);
    //     // Implement logic to display details, e.g., modal or in-page display
    //   });
  }

  // Toggle selection for all rows
  toggleAllRows(): void {
    if (this.isAllSelected()) {
      this.selectedRows.clear();
    } else {
      this.selectedRows.select(...this.payHistory.data);
    }
  }

  // Check if all rows are selected
  isAllSelected(): boolean {
    const numSelected = this.selectedRows.selected.length;
    const numRows = this.payHistory.data.length;
    return numSelected === numRows;
  }

  // Edit a specific salary payment entry
  editSalaryPayment(salaryPaymentsId: number): void {
    this.router.navigate([`/billing/payroll/edit`, salaryPaymentsId]);
  }

  // Delete a specific salary payment entry
  deleteSalaryPayment(salaryPaymentsId: number): void {
    if(this.isAdminOrSuperAdmin)
    {
    this.confirmationService.confirmDelete().then((result: any) => {
      if (result.isConfirmed) {
        this.financialOperationsService.deleteSalaryPayments(salaryPaymentsId).subscribe(
          (response) => {
            Swal.fire('Deleted!', 'Your data has been deleted.', 'success');
            this.loadPayHistory(this.selectedEmployeeId);
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
  else
  {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "You are not authorized to Delete it !",
      // footer: '<a href="#">Why do I have this issue?</a>'
    });
  }
  }

  // Edit taxes and SSN deductions
  editTaxesAndSsn(): void {
    console.log('Editing Taxes and SSN Deductions');
    // Implement edit logic as needed
  }

  // Edit benefits and leave information
  editBenefitsAndLeave(): void {
    console.log('Editing Benefits and Leave');
    // Implement edit logic as needed
  }

  // Automatically pay all employees
  autoPayAllEmployees() {
    console.log('Auto Paying All Employees');
    // Implement auto-pay logic as needed
  }

  // Navigate to the form to create a payroll entry
  createEmployeePayRoll() {
    this.router.navigate(['billing/payroll/create']);
  }

  loadEmplyeeById(id: number): void {
    this.financialOpService.GetPaymentByIdAsync(id).subscribe({
      next: (employeeData) => {
        this.payRollViewData=employeeData.data;
        this.viewPayRoll();
      },
      error: (err) => {
        this.showErrorMessage('Failed to load employee data.');
      },
    });
  }

  viewPayRoll(): void {
    const dialogref = this.dialog.open(PayrollViewComponent, {
      disableClose: true,
      autoFocus: false,
      width: '50%',
      height: '30vh',
      data: {
       payRollData: this.payRollViewData
      },
    })
    dialogref.afterClosed().subscribe({
      next: (value) => {
        if (value) {
         
        }
      },
    });
  }
  
 


  showErrorMessage(failMessage:string) {
    this.message.open(failMessage, 'Retry', {
      duration: 5000, // Duration in milliseconds
      horizontalPosition: 'center',
      verticalPosition: 'bottom', // or 'top'
      panelClass: ['error-snackbar'] // Optional: for custom styling
    });
  }
}
