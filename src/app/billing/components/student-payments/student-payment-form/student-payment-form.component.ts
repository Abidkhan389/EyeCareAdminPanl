import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StudentPayments } from '../../../../apiTypes/ApiTypes';
import { StudentService } from '../../../../../services/student.service';
import { FinancialOperationsService } from '../../../services/financial-operations.service';
import { Student } from '../../../../apiTypes/student';
import { AlertService } from '../../../../shared/services/alert.service';
import { ALERT_TYPE } from '../../../../shared/models/alert';
import { StudentAccount } from '../../../../apiTypes/studentaccount';
import { AuthService } from '../../../../auth/services/auth.service';
import { Router } from '@angular/router';
import { CurrencyCode } from 'src/app/apiTypes/currencycode';
import { CurrencyCodeService } from 'src/services/currency-code.service';

@Component({
  selector: 'app-student-payment-form',
  templateUrl: './student-payment-form.component.html',
  styleUrl: './student-payment-form.component.scss',
})
export class StudentPaymentFormComponent implements OnInit {
  studentForm: FormGroup;
  currencies !: CurrencyCode[]; 
  students!: Student[];
  isLoading = true;
  account!: StudentAccount;

  constructor(
    private fb: FormBuilder,
    private readonly studentService: StudentService,
    private readonly financeService: FinancialOperationsService,
    private readonly alertService: AlertService,
    private readonly authService: AuthService,
    private readonly router: Router,
    private currencyCodeService: CurrencyCodeService,
  ) {
    this.studentForm = this.fb.group({
      studentPaymentId: [0],
      paperRecptNumber: ['', Validators.required],
      paymentDate: [{ value: new Date(), disabled: true }], // Disabled payment date with default value
      amount: ['', [Validators.required, Validators.min(0)]],
      currency: ['', Validators.required],
      payeeName: ['', Validators.required],
      payeeNumber: ['', [Validators.required, Validators.pattern('[0-9]{10}')]], // Assuming 10 digit number
      receivedBy: [
        { value: this.authService.getCurrentUser().userName, disabled: true },
        Validators.required,
      ],
      createdOn: [{ value: new Date(), disabled: true }], // Automatically set to now, disabled
      notes: [''],
      accountId: ['', Validators.required],
      studentId: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.studentService.getStudents().subscribe((x) => {
      this.students = x.data;
      if (!x.success) {
        this.alertService.alert(
          x.errors[0] ?? 'Something went wrong. Please try again later!',
          ALERT_TYPE.ERROR
        );
      }
      this.isLoading = false;
    });
    this.currencies = this.currencyCodeService.getCurrencyCodes();
  }

  loadAccounts(event: string) {
    var val = event;
    this.financeService.getStudentAccount(parseInt(val)).subscribe((x) => {
      if (!x.success) {
        this.alertService.alert(
          x.errors[0] ?? 'Something went wrong. Please try again later!',
          ALERT_TYPE.ERROR
        );
      }
      this.account = x.data;
    });
  }

  onSubmit() {
    if (this.studentForm.valid) {
      const studentPaymentData: StudentPayments =
        this.studentForm.getRawValue();
      this.financeService
        .postStudentPayment(studentPaymentData)
        .subscribe((x) => {
          if (x.success) {
            this.alertService.alert(
              'Payment posted successfully!',
              ALERT_TYPE.SUCCESS
            );
            this.router.navigate(['/billing']);
          } else {
            this.alertService.alert(x.errors[0] ?? '', ALERT_TYPE.ERROR);
          }
        });
    }
  }
}
