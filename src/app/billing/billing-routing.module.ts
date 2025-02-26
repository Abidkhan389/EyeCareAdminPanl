import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BillingComponent } from './billing.component';
import { StudentPaymentFormComponent } from './components/student-payments/student-payment-form/student-payment-form.component';
import { StudentPaymentViewComponent } from './components/student-payments/student-payment-view/student-payment-view.component';
import { InvoiceFormComponent } from './components/invoices/invoice-form/invoice-form.component';
import { InvoiceViewComponent } from './components/invoices/invoice-view/invoice-view.component';
import { PayInsFormComponent } from './components/pay-ins/pay-ins-form/pay-ins-form.component';
import { PayrollFormComponent } from './components/payroll-dashboard/payroll-form/payroll-form.component';

const routes: Routes = [
  {
    path: '',
    component: BillingComponent,
  },
  {
    path: 'studentPayment/create',
    component: StudentPaymentFormComponent,
  },
  {
    path: 'studentPayment/view/:id',
    component: StudentPaymentViewComponent,
  },
  {
    path: 'invoices/create',
    component: InvoiceFormComponent,
  },
  {
    path: 'invoices/edit/:id',
    component: InvoiceFormComponent,
  },
  {
    path: 'invoice/view/:id',
    component: InvoiceViewComponent,
  },
  {
    path: 'payins/create',
    component: PayInsFormComponent,
  },
  {
    path: 'payins/edit/:id',
    component: PayInsFormComponent,
  },
  {
    path: 'payroll/create',
    component: PayrollFormComponent,
  },
  {
    path: 'payroll/edit/:id',
    component: PayrollFormComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BillingRoutingModule {}
