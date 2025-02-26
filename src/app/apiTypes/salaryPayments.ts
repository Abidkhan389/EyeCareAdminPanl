export interface SalaryPayments {
  salaryPaymentsId: number;
  employeeId: number;
  paymentAmount: number;
  forPayPeriod: string;
  paidOn: Date;
  paidBy: string;
}
