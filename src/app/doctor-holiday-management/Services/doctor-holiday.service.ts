import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, finalize } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DoctorHolidayService {

  
    private apiUrl = environment.baseUrl + 'DoctorHoliday';
        constructor(private http: HttpClient) {}
            
          getAllByProcDoctorHolidays(modal: any): Observable<any> {
              const endpoint = `${this.apiUrl}/GetAllByProc`;
              return this.http.post<any>(endpoint, modal);
            }
  
            activeInActive(modal: any): Observable<any> {
              const endpoint = `${this.apiUrl}/ActiveInActive`;
              return this.http.post<any>(endpoint, modal).pipe(
                finalize(() => {
                  console.log("API call completed");
                })
              );
            }
            getByIdDoctorHoliday(modal: any): Observable<any> {
              const endpoint = `${this.apiUrl}/GetByIdDoctorHoliday`;
              return this.http.post<any>(endpoint, modal).pipe( 
                finalize(() => {
                  console.log("API call completed");
                })
              );
            }
            getDoctorHolidayByDoctorIdForPatientAppointment(modal: any): Observable<any> {              
              const endpoint = `${this.apiUrl}/GetDoctorHolidayByDoctorIdForPatientAppointment`;
              return this.http.post<any>(endpoint, modal).pipe( 
                finalize(() => {
                  console.log("API call completed");
                })
              );
            }
            addEditDoctorHoliday(modal: any): Observable<any> {
              const endpoint = `${this.apiUrl}/addEditDoctorHoliday`;
              return this.http.post<any>(endpoint, modal).pipe( 
                finalize(() => {
                  console.log("API call completed");
                })
              );
            }
}
