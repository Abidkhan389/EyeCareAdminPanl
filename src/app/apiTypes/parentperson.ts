import { Person } from "./person";

export interface ParentPerson extends Person
{
      firstName: string;
      lastName: string;
      homePhone:String,
      countryCode: string,
      employer :string,
      isEmployed : boolean
      employerNumber:String, 
      employerAddress:string 
      emergencyContact :string
      salary:number,
      connectWithAccount:boolean
}
