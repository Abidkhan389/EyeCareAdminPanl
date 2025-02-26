import { Person } from "./person";

export interface Student extends Person
{
  gradeId: number,
  gradeLabel: string,
  accountId?:number,
  hasAlreadyAccount?: boolean
}
