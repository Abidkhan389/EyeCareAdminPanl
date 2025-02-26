import { Person } from "./person";

export interface EmployeePerson extends Person {
  highestEducation: string;
  gpa: string;
  yearsOfExperience: number;
  specialty: string;
  childrenCount: number;
  monthlySalary: number;
  sickDays: number;
  sickDaysAvailable: number;
  holidayDays: number;
  holidayDaysAvailable: number;
  employeeType: string;
}
