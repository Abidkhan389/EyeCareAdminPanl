export interface PayIn {
  payInId: number;
  incomeTypeId: number;
  amount: number;
  currencyCode: string;
  description: string;
  paidOn: Date;
  createdOn: Date;
  createdBy: string;
  lastUpdatedOn: Date;
  lastUpdatedBy: string;
  vendorId?: number; // Optional field
}

export interface PayOut {
  payOutId: number;
  invoiceId: number;
  amount: number;
  description: string;
  overrideNoInvoice: boolean;
  overrideReason: string;
  paidOn: Date;
  paidBy: string;
}

export interface StudentPayments {
  studentPaymentId: number;
  paperRecptNumber: number;
  paymentDate: Date;
  amount: number;
  currency: string;
  payeeName: string;
  payeeNumber: string;
  receivedBy: string;
  createdOn: Date;
  notes: string;
  accountId: number;
}
export interface Invoice {
  vendorInvoiceId: number;
  vendorId: number;
  amount: number;
  vendorInvoiceNumber: string;
  invoiceScanImage: string;
  invoiceDate: Date;
  createdOn: Date;
  createdBy: string;
  lastUpdatedOn: Date;
  lastUpdatedBy: string;
  isOutStanding: boolean;
  dueDate: Date;
}

export interface InvoiceItem {
  invoiceItemId: number;
  invoiceId: number;
  itemPrice: number;
  qty: number;
  itemsTotal: number;
  itemName: string;
  itemDescription: string;
  notes: string;
}

// Original SalaryPayments interface
export interface SalaryPayments {
  salaryPaymentsId: number;
  employeeId: number;
  paymentAmount: number;
  forPayPeriod: string;
  paidOn: Date;
  paidBy: string;
}

// Deduction details interface
export interface SalaryDeduction {
  type: string; // e.g., "Tax", "Social Security"
  amount: number; // The deduction amount
  percentage: number; // The deduction percentage for display
}

// New SalaryPaymentsDto interface with deductions
export interface SalaryPaymentsDto extends SalaryPayments {
  deductions: SalaryDeduction[]; // Array of deductions
}

export interface PayOut {
  payOutId: number;
  invoiceId: number;
  amount: number;
  description: string;
  overrideNoInvoice: boolean;
  overrideReason: string;
  paidOn: Date;
  paidBy: string;
}

export interface InvoiceItem {
  invoiceItemId: number;
  invoiceId: number;
  itemPrice: number;
  qty: number;
  itemsTotal: number;
  itemName: string;
  itemDescription: string;
  notes: string;
}

export interface Invoice {
  vendorInvoiceId: number;
  vendorId: number;
  amount: number;
  vendorInvoiceNumber: string;
  invoiceScanImage: string;
  invoiceDate: Date;
  createdOn: Date;
  createdBy: string;
  lastUpdatedOn: Date;
  lastUpdatedBy: string;
  isOutStanding: boolean;
  dueDate: Date;
}

export interface InvoiceDto {
  invoice: Invoice;

  /**
   * One item is required for a given invoice
   * otherwise invoice will NOT be created
   */
  invoiceItems: InvoiceItem[];

  /**
   * Use this only in post from front end
   * ONLY if they marked Pay In Full Now
   * Upon creating the invoice otherwise
   * we support making multiple payments
   * on a single invoice
   */
  payOut?: PayOut;

  /**
   * Use this when getting invoice details
   * to get all payments made on a single
   * invoice.
   */
  payOuts?: PayOut[];
}

export enum InvoiceStatus {
  PAID = "PAID",
PENDING = "PENDIGN",
REFUNDED = "REFUNDED",
ADJUSTED = "ADJUSTED",
DISPUTED = "DISPUTED",
}
