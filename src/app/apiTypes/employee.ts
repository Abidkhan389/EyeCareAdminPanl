import { Person } from "./person";
export interface EmployeePerson extends Person 
{
    heighestEducatioin: string;
    gpa: string;
    yearsOfExperience: number;
    specialty: string;
    childrenCount: number;
    monthlySalary: number;
    sickDays: number;            // Optional field (nullable in C#)
    sickDaysAvailable?: number;
    holidayDays: number;         // Optional field (nullable in C#)
    holidayDaysAvailable?: number; // Optional field (nullable in C#)
    employeeType: string;
    employeeTypeText: string;
}