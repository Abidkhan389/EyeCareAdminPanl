import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, finalize } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PatientCheckUpDescriptionService {
  private setDescription:boolean=false;

 private apiUrl = environment.baseUrl + 'Patient';
   constructor(private http: HttpClient) { }
 
   // Setter Method to set true/false
  setDescriptionValue(description: boolean): void {
    this.setDescription = description;
  }
  // Getter Method (optional, if you want to use this value elsewhere)
  getDescriptionValue(): boolean {
    return this.setDescription;
  }
   getAllTodeyPatientAppoitments(modal: any): Observable<any> {
     const endpoint = `${this.apiUrl}/GetAllTodeyPatientAppoitments`;
     return this.http.post<any>(endpoint, modal).pipe(
       finalize(() => {
         console.log("API call completed");
       })
     );
   }
   
 
   activeInActive(modal: any): Observable<any> {
     const endpoint = `${this.apiUrl}/ActiveInActive`;
     return this.http.post<any>(endpoint, modal).pipe(
       finalize(() => {
         console.log("API call completed");
       })
     );
   }
   GetPatientDescriptionById(modal: any): Observable<any> {
     const endpoint = `${this.apiUrl}/GetPatientDescriptionById`;
     return this.http.post<any>(endpoint, modal).pipe(
       finalize(() => {
         console.log("API call completed");
       })
     );
   }
  
   addPatientDescription(modal: any): Observable<any> {
     const endpoint = `${this.apiUrl}/AddPatientDescription`;
     return this.http.post<any>(endpoint, modal).pipe(
       finalize(() => {
         console.log("API call completed");
       })
     );
   }
}
