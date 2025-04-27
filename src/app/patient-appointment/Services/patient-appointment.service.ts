import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, finalize, tap, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PatientAppointmentService {

   private apiUrl = environment.baseUrl + 'Patient';
   private identityUrl = environment.baseUrl+ 'Account';
        constructor(private http: HttpClient) {}
            
            getAllpatientAppointment(modal: any): Observable<any> {
              const endpoint = `${this.apiUrl}/GetAllByProc`;
              return this.http.post<any>(endpoint, modal);
            }
            
            getAllDoctors(): Observable<any> {
              const endpoint = `${this.identityUrl}/GetAllDoctors`;
              return this.http.get<any>(endpoint).pipe(
                tap(() => console.log("API call started")),
                catchError(error => {
                  console.error("Error fetching doctors:", error);
                  return throwError(() => error);
                })
              );
            }
            

            patientAppointmentStatus(modal: any): Observable<any> {
              const endpoint = `${this.apiUrl}/ActiveInActive`;
              return this.http.post<any>(endpoint, modal).pipe(
                finalize(() => {
                  console.log("API call completed");
                })
              );
            }
            getPatientAppointmentById(modal: any): Observable<any> {
              const params = new HttpParams().set('PatientId', modal.id);
            
              const endpoint = `${this.apiUrl}/GetPatientById`;
              return this.http.get<any>(endpoint, { params }).pipe(
                finalize(() => {
                  console.log("API call completed");
                })
              );
            }
            getDoctorFeeByDocotorId(doctorId: any): Observable<any> {
              const params = new HttpParams().set('DoctorId', doctorId);
              const endpoint = `${this.identityUrl}/GetDoctorFeeByDocotorId`;
              return this.http.get<any>(endpoint, { params }).pipe(
                finalize(() => {
                  console.log("API call completed");
                })
              );
            }
            
            addEditpatientAppointment(modal: any): Observable<any> {
              const endpoint = `${this.apiUrl}/AddEditPatient`;
              return this.http.post<any>(endpoint, modal).pipe( 
                finalize(() => {
                  console.log("API call completed");
                })
              );
            }
            addEditPatientDiscount(modal: any): Observable<any> {
              const endpoint = `${this.apiUrl}/PatientDiscount`;
              return this.http.post<any>(endpoint, modal).pipe( 
                finalize(() => {
                  console.log("API call completed");
                })
              );
            }
            
            deleteUsers(ids: any): Observable<boolean> {
              return this.http.post<boolean>(this.apiUrl+'/Delete', Array.isArray(ids) ? ids : [ids]);
           }
           getDoctorAppointmentsSlotsOfDay(modal: any): Observable<any> {
            const endpoint = `${this.apiUrl}/GetDoctorAppointmentsSlotsOfDay`;
            return this.http.post<any>(endpoint, modal).pipe( 
              finalize(() => {
                console.log("API call completed");
              })
            );
          }
         
           
}
