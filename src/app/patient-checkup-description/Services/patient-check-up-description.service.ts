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
 private patientCheckUpDescriptionapiUrl = environment.baseUrl + 'PatientCheckUpHistory';
   constructor(private http: HttpClient) { }

  getAllByProc(modal: any): Observable<any> {
     const endpoint = `${this.patientCheckUpDescriptionapiUrl}/getAllByProc`;
     return this.http.post<any>(endpoint, modal).pipe(
       finalize(() => {
         console.log("API call completed");
       })
     );
   }
   
 
   activeInActive(modal: any): Observable<any> {
     const endpoint = `${this.patientCheckUpDescriptionapiUrl}/ActiveInActive`;
     return this.http.post<any>(endpoint, modal).pipe(
       finalize(() => {
         console.log("API call completed");
       })
     );
   }
   GetPatientDescriptionById(modal: any): Observable<any> {
     const endpoint = `${this.patientCheckUpDescriptionapiUrl}/GetPatientDescriptionById`;
     return this.http.post<any>(endpoint, modal).pipe(
       finalize(() => {
         console.log("API call completed");
       })
     );
   }
   GetPatientDescriptionByIdForShowHistroy(modal: any): Observable<any> {
    const endpoint = `${this.patientCheckUpDescriptionapiUrl}/GetPatientDescriptionByIdForShowHistroy`;
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
