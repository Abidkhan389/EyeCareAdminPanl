import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, finalize, map, tap, throwError } from 'rxjs';
import { ApiService } from 'src/app/_common/_services/api.service';
import { APIPaths } from 'src/app/_common/constant';
import { showErrorMessage, showSuccessMessage } from 'src/app/_common/messages';
import { Table } from 'src/app/interfaces/ITable';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MedicinesService extends ApiService {


  private apiUrl = environment.baseUrl + 'Medicine';
  private identityUrl = environment.baseUrl + 'Account';
  constructor(private http: HttpClient) {
    super(http);
  }

  // getAllMedicines(modal: any): Observable<any> {
  //   const endpoint = `${this.apiUrl}/GetAllByProc`;
  //   return this.http.post<any>(endpoint, modal);
  // }

  getAllMedicines(model: Table) {
    let onSuccess = (value: any) => {
      let data = value;
      if (data.totalCount != 0) {
        return data;
      } else {
        showErrorMessage(data.message)
        return false;
      }
    };
    return this.service(this.post(APIPaths.getAllMedicines, model)).pipe(
      map(value => this.processPayload(value)),
      map(onSuccess)
    );
  }

  // updateMedicinesStatus(modal: any): Observable<any> {
  //   const endpoint = `${this.apiUrl}/ActiveInActive`;
  //   return this.http.post<any>(endpoint, modal).pipe(
  //     finalize(() => {
  //       console.log("API call completed");
  //     })
  //   );
  // }

  updateMedicinesStatus(model: any) {
    let onSuccess = (value: any) => {
      let data = value;
      debugger;
      return data
    };
    return this.service(this.post(APIPaths.updateMedicinesStatus, model)).pipe(
      map(value => this.processPayload(value)),
      map(onSuccess)
    );
  }
  // getMedicineById(modal: any): Observable<any> {
  //   const endpoint = `${this.apiUrl}/GetMedicineById`;
  //   return this.http.post<any>(endpoint, modal).pipe(
  //     finalize(() => {
  //       console.log("API call completed");
  //     })
  //   );
  // }
   getMedicineById(model: any) {
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
      return this.service(this.get(APIPaths.GetMedicineById, params)).pipe(
        map(value => this.processPayload(value)),
        map(onSuccess)
      );
    }
  // addEditMedicines(modal: any): Observable<any> {
  //   const endpoint = `${this.apiUrl}/AddEditmedicine`;
  //   return this.http.post<any>(endpoint, modal).pipe(
  //     finalize(() => {
  //       console.log("API call completed");
  //     })
  //   );
  // }
   addEditMedicines(model: any) {
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
          return this.service(this.post(APIPaths.AddEditmedicine, model)).pipe(
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

  // getAllDoctors(): Observable<any> {
  //   const endpoint = `${this.identityUrl}/GetAllDoctors`;
  //   return this.http.get<any>(endpoint).pipe(
  //     tap(() => console.log("API call started")),
  //     catchError(error => {
  //       console.error("Error fetching doctors:", error);
  //       return throwError(() => error);
  //     })
  //   );
  // }
   getAllDoctors() {
      let onSuccess = (value:any) => {
        let data = value;
        if (data.success) {
  
          return data;
        } else {
          showErrorMessage(data.message)
          return false;
        }
      };
      return this.service(this.get(APIPaths.getAllDoctors)).pipe(
        map(value => this.processPayload(value)),
        map(onSuccess)
      );
    }

  // getAllMedicineTypes(): Observable<any> {
  //   const endpoint = `${this.apiUrl}/GetMedicineTypesList`;
  //   return this.http.get<any>(endpoint).pipe(
  //     tap(() => console.log("API call started")),
  //     catchError(error => {
  //       console.error("Error fetching doctors:", error);
  //       return throwError(() => error);
  //     })
  //   );
  // }
getAllMedicineTypes() {
      let onSuccess = (value:any) => {
        let data = value;
        if (data.success) {
          
          return data;
        } else {
          showErrorMessage(data.message)
          return false;
        }
      };
      return this.service(this.get(APIPaths.getMedicineTypesList)).pipe(
        map(value => this.processPayload(value)),
        map(onSuccess)
      );
    }

  // getAllDoctorMedicine(modal: any): Observable<any> {
  //   const endpoint = `${this.apiUrl}/GetAllDoctorMedicine`;
  //   return this.http.post<any>(endpoint, modal).pipe(
  //     finalize(() => {
  //       console.log("API call completed");
  //     })
  //   );
  // }
    getAllDoctorMedicine(model: any) {
          let onSuccess = (value:any) => {
            let data = value;
            if (data.success) {
              
             return data;
            } else {
              showErrorMessage(data.message)
              return false;
            }
          };
          return this.service(this.post(APIPaths.getAllDoctorMedicine, model)).pipe(
            map(value => this.processPayload(value)),
            map(onSuccess)
          );
        }
  // getPotencyListByType(medicineTypeId: any): Observable<any> {
  //   const params = new HttpParams().set('id', medicineTypeId.toString());
  //   return this.http.get<any>(`${this.apiUrl}/GetMedicinePotencyByMedicineTypeId`, { params });
  // }
   getPotencyListByType(medicineTypeId: any) {
    
      //const guid = medicineTypeId?.Id || medicineTypeId?.id || medicineTypeId; // extract the string value
    let params = new HttpParams().set('Id', medicineTypeId.toString());
      let onSuccess = (value:any) => {
        let data = value;
        if (data.success) {
  
          return data;
        } else {
          showErrorMessage(data.message)
          return false;
        }
      };
      return this.service(this.get(APIPaths.getMedicinePotencyByMedicineTypeId, params)).pipe(
        map(value => this.processPayload(value)),
        map(onSuccess)
      );
    }
  // GetDoctorMedicinePotencyById(modal: any): Observable<any> {
  //   const endpoint = `${this.apiUrl}/GetDoctorMedicinePotencyById`;
  //   return this.http.post<any>(endpoint, modal).pipe(
  //     finalize(() => {
  //       console.log("API call completed");
  //     })
  //   );
  // }
    GetDoctorMedicinePotencyById(model: any) {
          let onSuccess = (value:any) => {
            let data = value;
            if (data.success) {
              
             return data;
            } else {
              showErrorMessage(data.message)
              return false;
            }
          };
          return this.service(this.post(APIPaths.getDoctorMedicinePotencyById, model)).pipe(
            map(value => this.processPayload(value)),
            map(onSuccess)
          );
        }
  // addEditDoctorMedicines(modal: any): Observable<any> {
  //   const endpoint = `${this.apiUrl}/CreateDoctorMedicineMapping`;
  //   return this.http.post<any>(endpoint, modal).pipe(
  //     finalize(() => {
  //       console.log("API call completed");
  //     })
  //   );
  // }
   addEditDoctorMedicines(model: any) {
    debugger
          let onSuccess = (value:any) => {
            let data = value;
            if (data.success) {
              debugger
              showSuccessMessage(data.message)
              return true;
            } else {
              debugger
              showErrorMessage(data.message)
              return false;
            }
          };
          return this.service(this.post(APIPaths.createDoctorMedicineMapping, model)).pipe(
            map(value => this.processPayload(value)),
            map(onSuccess)
          );
        }

  // GetDoctorMedicineMapping(medicineId: string): Observable<any> {
  //   const params = new HttpParams().set('medicineId', medicineId);
  //   return this.http.get<any>(`${this.apiUrl}/GetDoctorMedicineMappingList`, { params });
  // }
   GetDoctorMedicineMapping(medicineId: any) {
    
      //const guid = medicineTypeId?.Id || medicineTypeId?.id || medicineTypeId; // extract the string value
    let params = new HttpParams().set('medicineId', medicineId.toString());
      let onSuccess = (value:any) => {
        let data = value;
        if (data.success) {
          debugger
          return data;
        } else {
          showErrorMessage(data.message)
          return false;
        }
      };
      return this.service(this.get(APIPaths.getDoctorMedicineMappingList, params)).pipe(
        map(value => this.processPayload(value)),
        map(onSuccess)
      );
    }
}
