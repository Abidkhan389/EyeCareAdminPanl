import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, finalize } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DoctorAvailabilityService {

  private apiUrl = environment.baseUrl + 'DoctorAvailability';
  constructor(private http: HttpClient) { }

  getAllByProc(modal: any): Observable<any> {
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
  getByIdDoctorAvaibality(modal: any): Observable<any> {
    const endpoint = `${this.apiUrl}/GetByIdDoctorAvaibality`;
    return this.http.post<any>(endpoint, modal).pipe(
      finalize(() => {
        console.log("API call completed");
      })
    );
  }
 
  addEditDoctorAvaibality(modal: any): Observable<any> {
    const endpoint = `${this.apiUrl}/AddEditDoctorAvaibality`;
    return this.http.post<any>(endpoint, modal).pipe(
      finalize(() => {
        console.log("API call completed");
      })
    );
  }

}
