import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BillingRoutingModule } from './billing-routing.module';
import { BillingComponent } from './billing.component';
import { MaterialModule } from '../material/material.module';
import { SharedModule } from '../shared/shared.module';
import { PayInsComponent } from './components/pay-ins/pay-ins.component';
import { StudentPaymentsComponent } from './components/student-payments/student-payments.component';
import { PayRollComponent } from './components/pay-roll/pay-roll.component';
import { ReactiveFormsModule } from '@angular/forms';
import { StudentPaymentFormComponent } from './components/student-payments/student-payment-form/student-payment-form.component';
import { StudentPaymentViewComponent } from './components/student-payments/student-payment-view/student-payment-view.component';
import { InvoiceFormComponent } from './components/invoices/invoice-form/invoice-form.component';
import { InvoicesComponent } from './components/invoices/invoices.component';
import { InvoiceViewComponent } from './components/invoices/invoice-view/invoice-view.component';
import { PayInsFormComponent } from './components/pay-ins/pay-ins-form/pay-ins-form.component';
import { PayrollDashboardComponent } from './components/payroll-dashboard/payroll-dashboard.component';
import { PayrollFormComponent } from './components/payroll-dashboard/payroll-form/payroll-form.component';
import { PaystubConfirmationDialogComponent } from './components/payroll-dashboard/paystub-confirmation-dialog/paystub-confirmation-dialog.component';
import { TranslateModule } from '@ngx-translate/core';
import { PayrollViewComponent } from './components/payroll-dashboard/payroll-view/payroll-view.component';

@NgModule({
  declarations: [
    InvoicesComponent,
    BillingComponent,
    PayInsComponent,
    StudentPaymentsComponent,
    PayRollComponent,
    StudentPaymentFormComponent,
    StudentPaymentViewComponent,
    InvoiceFormComponent,
    InvoiceViewComponent,
    PayInsFormComponent,
    PayrollDashboardComponent,
    PayrollFormComponent,
    PaystubConfirmationDialogComponent,
    PayrollViewComponent
  ],
  imports: [
    CommonModule,
    BillingRoutingModule,
    MaterialModule,
    SharedModule,
    ReactiveFormsModule,
    TranslateModule,
  ],
})
export class BillingModule {}
