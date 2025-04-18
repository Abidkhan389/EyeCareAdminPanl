export interface Person {
  id: number;
  firstName: string;
  middleName: string;
  grandParentName: string;
  lastName: string;
  countryCode: string;
  phoneNumber: string;
  dateOfBirth: Date;
  socialSecurity: string; //nation number
  identificationType: number;
  identificationTypeText: number;
  identificationNumber: string;
  createdBy: string;
  createdOn: Date;
  updatedBy: string;
  updatedOn: Date;
  isActive: boolean;
  notes: string;
  citizenShip: string;
  gender: number;
  genderText: string;
  motherName: string;
  maritalStatus: number;
  maritalStatusText: string;
  religion: number;
  religionText: string;
  placeOfBirth: string;
  email: string;
  socialSeucirty?:string
}
