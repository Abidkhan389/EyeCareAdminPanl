import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, finalize } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PatientAppointmentService {

   private apiUrl = environment.baseUrl + 'Patient';
        constructor(private http: HttpClient) {}
            
            getAllpatientAppointment(modal: any): Observable<any> {
              const endpoint = `${this.apiUrl}/GetAllByProc`;
              return this.http.post<any>(endpoint, modal);
            }
  
            patientAppointmentStatus(modal: any): Observable<any> {
              const endpoint = `${this.apiUrl}/ActiveInActive`;
              return this.http.post<any>(endpoint, modal).pipe(
                finalize(() => {
                  console.log("API call completed");
                })
              );
            }
            getpatientAppointmentById(modal: any): Observable<any> {
              const endpoint = `${this.apiUrl}/GetMedicineTypeById`;
              return this.http.post<any>(endpoint, modal).pipe( 
                finalize(() => {
                  console.log("API call completed");
                })
              );
            }
            addEditpatientAppointment(modal: any): Observable<any> {
              const endpoint = `${this.apiUrl}/addEditmedicineType`;
              return this.http.post<any>(endpoint, modal).pipe( 
                finalize(() => {
                  console.log("API call completed");
                })
              );
            }
            
            deleteUsers(ids: any): Observable<boolean> {
              return this.http.post<boolean>(this.apiUrl+'/Delete', Array.isArray(ids) ? ids : [ids]);
           }
         
           
}
