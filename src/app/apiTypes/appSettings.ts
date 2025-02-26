export interface AppSettingsDto {
  defaultCountry: string;
  salaryTaxDeduction: number;
  salarySocialSecurityDeduction: number;
  defaultCountryCodeForSMSService: string;
  startingSickDays: number;
  hasHealthInsurance: boolean;
  healthInsuranceObject: HealthInsuranceDetails;
  payPeriod: string;
}
export interface HealthInsuranceDetails {
  healthInsuranceProvider: string;
  healthInsuranceDeductions: number;
  healthInsuranceDeductable: number;
}

export interface PayPeriodDropdownItem {
  payPeriodLabel: string; // e.g., "Week 34"
  period: string; // e.g., "2023-W34"
}
