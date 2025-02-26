import { ParentPerson } from "./parentperson";
import { Student } from "./student";
import { StudentAccount } from "./studentaccount";

export interface StudentCreateDto {
  studentInfo: Student;
  parentPersons: ParentPerson[];
  account: StudentAccount;
}
