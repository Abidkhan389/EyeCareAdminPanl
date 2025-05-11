import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, finalize, map } from 'rxjs';
import { ApiService } from 'src/app/_common/_services/api.service';
import { APIPaths } from 'src/app/_common/constant';
import { showErrorMessage, showSuccessMessage } from 'src/app/_common/messages';
import { Table } from 'src/app/interfaces/ITable';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DoctorAvailabilityService  extends ApiService{

 // private apiUrl = environment.baseUrl + 'DoctorAvailability';
  constructor(private http: HttpClient) {
     super(http);
   }

  // getAllByProc(modal: any): Observable<any> {
  //   const endpoint = `${this.apiUrl}/GetAllByProc`;
  //   return this.http.post<any>(endpoint, modal).pipe(
  //     finalize(() => {
  //       console.log("API call completed");
  //     })
  //   );
  // }
 getAllByProc(model: Table) {
  let onSuccess = (value:any) => {
    let data = value;
    if (data.totalCount != 0) {
      return data;
    } else {
      showErrorMessage(data.message)
      return false;
    }
  };
  return this.service(this.post(APIPaths.getAllDoctorAvailability, model)).pipe(
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
    DoctorAvaailabilityActiveInActive(model: any) {
    let onSuccess = (value:any) => {
      let data = value;
      debugger;
      return data
    };
    return this.service(this.post(APIPaths.DoctorAvaailabilityActiveInActive, model)).pipe(
      map(value => this.processPayload(value)),
      map(onSuccess)
    );
  }
  // getByIdDoctorAvaibality(modal: any): Observable<any> {
  //   const endpoint = `${this.apiUrl}/GetByIdDoctorAvaibality`;
  //   return this.http.post<any>(endpoint, modal).pipe(
  //     finalize(() => {
  //       console.log("API call completed");
  //     })
  //   );
  // }
   getByIdDoctorAvaibality(model: any) {
    debugger;
    const guid = model?.Id || model?.id || model; // extract the string value
  let params = new HttpParams().set('Id', guid.toString());
    let onSuccess = (value:any) => {
      let data = value;
      debugger;
      if (data.success) {

        return data;
      } else {
        showErrorMessage(data.message)
        return false;
      }
    };
    return this.service(this.get(APIPaths.getByIdDoctorAvaibality, params)).pipe(
      map(value => this.processPayload(value)),
      map(onSuccess)
    );
  }
 
  // addEditDoctorAvaibality(modal: any): Observable<any> {
  //   const endpoint = `${this.apiUrl}/AddEditDoctorAvaibality`;
  //   return this.http.post<any>(endpoint, modal).pipe(
  //     finalize(() => {
  //       console.log("API call completed");
  //     })
  //   );
  // }
  addEditDoctorAvaibality(model: any) {
    let onSuccess = (value:any) => {
      let data = value;
      if (data.success) {
        showSuccessMessage(data.message)
        return true;
      } else {
        showErrorMessage(data.message)
        return false;
      }
    };
    return this.service(this.post(APIPaths.addEditDoctorAvaibality, model)).pipe(
      map(value => this.processPayload(value)),
      map(onSuccess)
    );
  }
  // deleteDoctorAvalability(Ids:any): Observable<void> {
  //   return this.http.delete<void>(`${this.apiUrl}/${Ids}`);
  // }

}
