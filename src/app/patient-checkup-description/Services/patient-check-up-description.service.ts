import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, finalize } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PatientCheckUpDescriptionService {

 private apiUrl = environment.baseUrl + 'DoctorAvailability';
   constructor(private http: HttpClient) { }
 
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
