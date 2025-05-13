import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, finalize, map } from 'rxjs';
import { ApiService } from 'src/app/_common/_services/api.service';
import { APIPaths } from 'src/app/_common/constant';
import { showErrorMessage } from 'src/app/_common/messages';
import { Table } from 'src/app/interfaces/ITable';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DoctorHolidayService extends ApiService {


  //private apiUrl = environment.baseUrl + 'DoctorHoliday';
  constructor(private http: HttpClient) {
    super(http);
  }

  // getAllByProcDoctorHolidays(modal: any): Observable<any> {
  //     const endpoint = `${this.apiUrl}/GetAllByProc`;
  //     return this.http.post<any>(endpoint, modal);
  //   }

  getAllByProcDoctorHolidays(model: Table) {
    let onSuccess = (value: any) => {
      let data = value;
      if (data.totalCount != 0) {
        return data;
      } else {
        showErrorMessage(data.message)
        return false;
      }
    };
    return this.service(this.post(APIPaths.getAllByProcDoctorHolidays, model)).pipe(
      map(value => this.processPayload(value)),
      map(onSuccess)
    );
  }

  // activeInActive(modal: any): Observable<any> {
  //   const endpoint = `${this.apiUrl}/ActiveInActive`;
  //   return this.http.post<any>(endpoint, modal).pipe(
  //     finalize(() => {
  //       console.log("API call completed");
  //     })
  //   );
  // }
  activeInActive(model: any) {
    let onSuccess = (value: any) => {
      let data = value;
      debugger;
      return data
    };
    return this.service(this.post(APIPaths.activeInActive, model)).pipe(
      map(value => this.processPayload(value)),
      map(onSuccess)
    );
  }
  // getByIdDoctorHoliday(modal: any): Observable<any> {
  //   const endpoint = `${this.apiUrl}/GetByIdDoctorHoliday`;
  //   return this.http.post<any>(endpoint, modal).pipe(
  //     finalize(() => {
  //       console.log("API call completed");
  //     })
  //   );
  // }
  getByIdDoctorHoliday(model: Table) {
    let onSuccess = (value: any) => {
      let data = value;
      if (data.success) {
        return data;
      } else {
        showErrorMessage(data.message)
        return false;
      }
    };
    return this.service(this.post(APIPaths.getByIdDoctorHoliday, model)).pipe(
      map(value => this.processPayload(value)),
      map(onSuccess)
    );
  }
  
  // getDoctorHolidayByDoctorIdForPatientAppointment(modal: any): Observable<any> {
  //   const endpoint = `${this.apiUrl}/GetDoctorHolidayByDoctorIdForPatientAppointment`;
  //   return this.http.post<any>(endpoint, modal).pipe(
  //     finalize(() => {
  //       console.log("API call completed");
  //     })
  //   );
  // }
  getDoctorHolidayByDoctorIdForPatientAppointment(model: any) {
    let onSuccess = (value: any) => {
      let data = value;
      if (data.success) {
        return data;
      } else {
        showErrorMessage(data.message)
        return false;
      }
    };
    return this.service(this.post(APIPaths.getDoctorHolidayByDoctorIdForPatientAppointment, model)).pipe(
      map(value => this.processPayload(value)),
      map(onSuccess)
    );
  }
  // addEditDoctorHoliday(modal: any): Observable<any> {
  //   const endpoint = `${this.apiUrl}/addEditDoctorHoliday`;
  //   return this.http.post<any>(endpoint, modal).pipe(
  //     finalize(() => {
  //       console.log("API call completed");
  //     })
  //   );
  // }
  addEditDoctorHoliday(model: any) {
    let onSuccess = (value: any) => {
      let data = value;
      debugger
      if (data.success) {
        return data;
      } else {
        showErrorMessage(data.message)
        return false;
      }
    };
    return this.service(this.post(APIPaths.addEditDoctorHoliday, model)).pipe(
      map(value => this.processPayload(value)),
      map(onSuccess)
    );
  }
}
