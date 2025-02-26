import { Component, Inject, OnInit } from '@angular/core';
import { FinancialOperationsService } from '../../../services/financial-operations.service';
import { ActivatedRoute } from '@angular/router';
import { StudentPayments } from '../../../../apiTypes/ApiTypes';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { StudentPaymentsComponent } from '../student-payments.component';

@Component({
  selector: 'app-student-payment-view',
  templateUrl: './student-payment-view.component.html',
  styleUrl: './student-payment-view.component.scss',
})
export class StudentPaymentViewComponent implements OnInit {
  isLoading = true;
  studentPayment!: StudentPayments;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any, // Injecting data
    private dialogRef: MatDialogRef<StudentPaymentsComponent>
  ) {}
  ngOnInit(): void {
    this.studentPayment = this.data;
    this.isLoading = false;
  }
  close() {
    this.dialogRef.close();
  }
}
