import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from '../../../../auth/services/auth.service';
import {
  SalaryPayments,
  SalaryDeduction,
  SalaryPaymentsDto,
} from '../../../../apiTypes/ApiTypes';
import { AppSettingsService } from '../../../../security/services/app-settings.service';
import {
  AppSettingsDto,
  PayPeriodDropdownItem,
} from '../../../../apiTypes/appSettings';
import { EmployeePerson } from '../../../../apiTypes/employee';
import { EmployeeService } from '../../../../employee/services/employee.service';
import { RepoResponse } from '../../../../apiTypes/RepoResponse';
import { PaystubConfirmationDialogComponent } from '../paystub-confirmation-dialog/paystub-confirmation-dialog.component';
import { FinancialOperationsService } from '../../../services/financial-operations.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from '../../../../shared/services/alert.service';
import { ALERT_TYPE } from '../../../../shared/models/alert';
import { DatePipe } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-payroll-form',
  templateUrl: './payroll-form.component.html',
  styleUrls: ['./payroll-form.component.scss'],
})
export class PayrollFormComponent implements OnInit {
  salaryPaymentForm!: FormGroup;
  isEdit = false;
  payPeriods: PayPeriodDropdownItem[] = [];
  appSettings!: AppSettingsDto;
  employees: EmployeePerson[] = [];
  selectedEmployee: EmployeePerson | undefined;
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private appSettingsService: AppSettingsService,
    private employeeService: EmployeeService,
    private dialog: MatDialog,
    private financialOpService: FinancialOperationsService,
    private router: Router,
    private alertService: AlertService,
    private route: ActivatedRoute,
    private message: MatSnackBar,
  ) {}

  ngOnInit(): void {
    this.createForm();
    this.route.params.subscribe((params) => {
      const id = params['id'];
      if (id) {
        this.isEdit = true;
        this.loadEmplyeeById(id);
      }
    });
    this.loadAppSettings();
    this.loadEmployees();
  }
 
  loadEmplyeeById(id: number): void {
    this.financialOpService.GetPaymentByIdAsync(id).subscribe({
      next: (employeeData) => {
        this.salaryPaymentForm.patchValue(employeeData.data)
      },
      error: (err) => {
        this.showErrorMessage('Failed to load employee data.');
      },
    });
  }
  

  loadAppSettings(): void {
    this.appSettingsService.getAppSettings().subscribe((res) => {
      this.appSettings = res.data;
    });
    this.appSettingsService
      .getPayPeriods()
      .subscribe((res) => (this.payPeriods = res.data));
  }

  loadEmployees(): void {
    this.employeeService
      .getEmployees()
      .subscribe((employees: RepoResponse<EmployeePerson[]>) => {
        this.employees = employees.data;
      });
  }

  createForm(): void {
    this.salaryPaymentForm = this.fb.group({
      salaryPaymentsId: [null],
      employeeId: [null, Validators.required],
      paymentAmount: [null, [Validators.required, Validators.min(0.01)]],
      forPayPeriod: ['', Validators.required],
      paidOn:  [this.formatDate(new Date())],
      paidBy: [this.authService.getCurrentUser().userName],
    });

    this.salaryPaymentForm
      .get('employeeId')
      ?.valueChanges.subscribe((employeeId) => {
        this.selectedEmployee = this.employees.find(
          (emp) => emp.id === employeeId
        );
      });
  }
  // Add this helper method
formatDate(date: Date): string {
  const year = date.getFullYear();
  const month = ('0' + (date.getMonth() + 1)).slice(-2);
  const day = ('0' + date.getDate()).slice(-2);
  return `${year}-${month}-${day}`;
}

  get salaryExceeds(): boolean {
    const amount = this.salaryPaymentForm.get('paymentAmount')?.value;
    return (
      (this.selectedEmployee && amount > this.selectedEmployee.monthlySalary) ??
      false
    );
  }

  calculateDeductions(amount: number): SalaryDeduction[] {
    const deductions: SalaryDeduction[] = [];
    const taxDeduction = amount * this.appSettings.salaryTaxDeduction;
    const socialSecurityDeduction =
      amount * this.appSettings.salarySocialSecurityDeduction;

    // Adding Tax Deduction
    deductions.push({
      type: 'Tax',
      amount: taxDeduction,
      percentage: this.appSettings.salaryTaxDeduction * 100, // Convert to percentage
    });

    // Adding Social Security Deduction
    deductions.push({
      type: 'Social Security',
      amount: socialSecurityDeduction,
      percentage: this.appSettings.salarySocialSecurityDeduction * 100, // Convert to percentage
    });

    return deductions;
  }

  onSubmit(): void {
    if (this.salaryPaymentForm.valid) {
      const paymentAmount = this.salaryPaymentForm.get('paymentAmount')?.value;
      const deductions = this.calculateDeductions(paymentAmount);

      // Construct SalaryPaymentsDto object with deductions
      const salaryPaymentDto: SalaryPaymentsDto = {
        ...this.salaryPaymentForm.value,
        deductions, // Include deductions in the DTO object
      };

      this.showConfirmationDialog(salaryPaymentDto);
    } else {
      this.salaryPaymentForm.markAllAsTouched();
    }
  }

  showConfirmationDialog(salaryPaymentDto: SalaryPaymentsDto): void {
    const dialogRef = this.dialog.open(PaystubConfirmationDialogComponent, {
      width: '1200px',
      height: '700px',
      data: {
        salaryPayment: salaryPaymentDto,
        selectedEmployee: this.selectedEmployee,
        appSettings: this.appSettings,
      },
    });

    dialogRef.afterClosed().subscribe((confirmed) => {
      if (confirmed) {
        // Logic to save the salary payment DTO
        this.financialOpService
          .createSalaryPayment(salaryPaymentDto)
          .subscribe((x: RepoResponse<boolean>) => {
            if (x.success) {
              this.alertService.alert(
                'Salary payment added successfully!',
                ALERT_TYPE.SUCCESS
              );
              this.router.navigate(['billing'], {
                queryParams: { tab: 'payroll' },
              });
            } else {
              this.alertService.alert(x.errors, ALERT_TYPE.ERROR);
            }
          });
      }
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
