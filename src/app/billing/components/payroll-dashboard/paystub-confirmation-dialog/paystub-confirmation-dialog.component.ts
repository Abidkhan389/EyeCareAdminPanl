import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SalaryPayments } from '../../../../apiTypes/ApiTypes';
import { EmployeePerson } from '../../../../apiTypes/employee';
import { AppSettingsDto } from '../../../../apiTypes/appSettings';

@Component({
  selector: 'app-paystub-confirmation-dialog',
  templateUrl: './paystub-confirmation-dialog.component.html',
  styleUrl: './paystub-confirmation-dialog.component.scss',
})
export class PaystubConfirmationDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<PaystubConfirmationDialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      salaryPayment: SalaryPayments;
      selectedEmployee: EmployeePerson;
      appSettings: AppSettingsDto;
    }
  ) {}

  closeDialog(confirmed: boolean): void {
    this.dialogRef.close(confirmed);
  }
}
