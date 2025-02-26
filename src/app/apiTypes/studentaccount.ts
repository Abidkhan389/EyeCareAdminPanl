import { Person } from './person';

export interface StudentAccount {
  id: number;
  studentId: number;
  annualFee: number;
  registrationFee: number;
  transportationFee: number;
  paymentPlanType: number;
  gradeName: string;
  schoolYearPeriod: number;
  isActive: boolean;
  paymentPlanTypeText: string;
  schoolYearPeriodText: string;
  gradeId: number;
  accountEmail: string;
  phoneNumber: string;
  recoveryPhone: string;
}
