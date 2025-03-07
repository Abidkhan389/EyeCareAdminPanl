import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, finalize, Observable } from 'rxjs';
import { RepoResponse } from 'src/app/apiTypes/RepoResponse';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class UserManagementService {

  private apiUrl = environment.baseUrl + 'Account';

  constructor(private http: HttpClient) { }
 
  getAllByProc(modal: any): Observable<any> {
    const endpoint = `${this.apiUrl}/GetAllByProc`;
    return this.http.post<any>(endpoint, modal);
  }

  userActiveInActiveStatus(modal: any): Observable<any> {
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

  addEditpatientAppointment(modal: any): Observable<any> {
    const endpoint = `${this.apiUrl}/AddEditPatient`;
    return this.http.post<any>(endpoint, modal).pipe(
      finalize(() => {
        console.log("API call completed");
      })
    );
  }

  deleteUsers(ids: any): Observable<boolean> {
    return this.http.post<boolean>(this.apiUrl + '/Delete', Array.isArray(ids) ? ids : [ids]);
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
