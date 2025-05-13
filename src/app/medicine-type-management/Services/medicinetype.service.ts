import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, finalize, map } from 'rxjs';
import { ApiService } from 'src/app/_common/_services/api.service';
import { APIPaths } from 'src/app/_common/constant';
import { showErrorMessage, showSuccessMessage } from 'src/app/_common/messages';
import { Table } from 'src/app/interfaces/ITable';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MedicinetypeService extends ApiService {


  private apiUrl = environment.baseUrl + 'Medicinetype';
  constructor(private http: HttpClient) {
    super(http);
  }

  // getAllMedicineType(modal: any): Observable<any> {
  //   const endpoint = `${this.apiUrl}/GetAllByProc`;
  //   return this.http.post<any>(endpoint, modal);
  // }

  getAllMedicineType(model: Table) {
    let onSuccess = (value: any) => {
      let data = value;
      if (data.totalCount != 0) {
        return data;
      } else {
        showErrorMessage(data.message)
        return false;
      }
    };
    return this.service(this.post(APIPaths.getAllMedicineType, model)).pipe(
      map(value => this.processPayload(value)),
      map(onSuccess)
    );
  }

  // updateMedicineTypeStatus(modal: any): Observable<any> {
  //   const endpoint = `${this.apiUrl}/ActiveInActive`;
  //   return this.http.post<any>(endpoint, modal).pipe(
  //     finalize(() => {
  //       console.log("API call completed");
  //     })
  //   );
  // }

  updateMedicineTypeStatus(model: any) {
    let onSuccess = (value: any) => {
      let data = value;
      debugger;
      return data
    };
    return this.service(this.post(APIPaths.updateMedicineTypeStatus, model)).pipe(
      map(value => this.processPayload(value)),
      map(onSuccess)
    );
  }

  // getMedicineTypeById(modal: any): Observable<any> {
  //   const endpoint = `${this.apiUrl}/GetMedicineTypeById`;
  //   return this.http.post<any>(endpoint, modal).pipe(
  //     finalize(() => {
  //       console.log("API call completed");
  //     })
  //   );
  // }

   getMedicineTypeById(model: any) {
      const guid = model?.Id || model?.id || model; // extract the string value
    let params = new HttpParams().set('Id', guid.toString());
      let onSuccess = (value:any) => {
        let data = value;
        if (data.success) {
  
          return data;
        } else {
          showErrorMessage(data.message)
          return false;
        }
      };
      return this.service(this.get(APIPaths.getMedicineTypeById, params)).pipe(
        map(value => this.processPayload(value)),
        map(onSuccess)
      );
    }

    
  // addEditMedicineType(modal: any): Observable<any> {
  //   const endpoint = `${this.apiUrl}/addEditmedicineType`;
  //   return this.http.post<any>(endpoint, modal).pipe(
  //     finalize(() => {
  //       console.log("API call completed");
  //     })
  //   );
  // }
   addEditMedicineType(model: any) {
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
        return this.service(this.post(APIPaths.addEditmedicineType, model)).pipe(
          map(value => this.processPayload(value)),
          map(onSuccess)
        );
      }
  deleteUsers(ids: any): Observable<boolean> {
    return this.http.post<boolean>(this.apiUrl + '/Delete', Array.isArray(ids) ? ids : [ids]);
  }

  GetUserByIdAsync(userId: string): Observable<any> {
    const endpoint = `${this.apiUrl}/GetUserById?UserId=${userId}`;
    return this.http.get<any>(endpoint);
  }
}
