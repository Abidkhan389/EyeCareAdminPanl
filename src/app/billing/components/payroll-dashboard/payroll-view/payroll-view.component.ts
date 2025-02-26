import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FinancialOperationsService } from 'src/app/billing/services/financial-operations.service';

@Component({
  selector: 'app-payroll-view',
  templateUrl: './payroll-view.component.html',
  styleUrl: './payroll-view.component.scss'
})
export class PayrollViewComponent {
  payRollViewData!: any;

  constructor(
    private dialogRef: MatDialogRef<PayrollViewComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private financialOpService: FinancialOperationsService,
  ) {
    // 
    this.payRollViewData=data.payRollData;
  }

  ngOnInit(): void {}

  closeDialog(): void {
    this.dialogRef.close();
  }

}
