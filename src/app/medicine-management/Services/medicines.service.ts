import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, finalize, tap, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MedicinesService {

  
  private apiUrl = environment.baseUrl + 'Medicine';
  private identityUrl = environment.baseUrl+ 'Account';
      constructor(private http: HttpClient) {}
          
          getAllMedicines(modal: any): Observable<any> {
            const endpoint = `${this.apiUrl}/GetAllByProc`;
            return this.http.post<any>(endpoint, modal);
          }

          updateMedicinesStatus(modal: any): Observable<any> {
            const endpoint = `${this.apiUrl}/ActiveInActive`;
            return this.http.post<any>(endpoint, modal).pipe(
              finalize(() => {
                console.log("API call completed");
              })
            );
          }
          getMedicineById(modal: any): Observable<any> {
            const endpoint = `${this.apiUrl}/GetMedicineById`;
            return this.http.post<any>(endpoint, modal).pipe( 
              finalize(() => {
                console.log("API call completed");
              })
            );
          }
          addEditMedicines(modal: any): Observable<any> {
            const endpoint = `${this.apiUrl}/AddEditmedicine`;
            return this.http.post<any>(endpoint, modal).pipe( 
              finalize(() => {
                console.log("API call completed");
              })
            );
          }
          
          deleteUsers(ids: any): Observable<boolean> {
            return this.http.post<boolean>(this.apiUrl+'/Delete', Array.isArray(ids) ? ids : [ids]);
         }
       
         GetUserByIdAsync(userId: string): Observable<any> {
          const endpoint = `${this.apiUrl}/GetUserById?UserId=${userId}`;
          return this.http.get<any>(endpoint);
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
        
        getAllMedicineTypes(): Observable<any> {
          const endpoint = `${this.apiUrl}/GetMedicineTypesList`;
          return this.http.get<any>(endpoint).pipe(
            tap(() => console.log("API call started")),
            catchError(error => {
              console.error("Error fetching doctors:", error);
              return throwError(() => error);
            })
          );
        }
        getAllDoctorMedicine(modal: any): Observable<any> {
          const endpoint = `${this.apiUrl}/GetAllDoctorMedicine`;
          return this.http.post<any>(endpoint, modal).pipe( 
            finalize(() => {
              console.log("API call completed");
            })
          );
        }
        getPotencyListByType(medicineTypeId: any): Observable<any> {
          const params = new HttpParams().set('id', medicineTypeId.toString());
          return this.http.get<any>(`${this.apiUrl}/GetMedicinePotencyByMedicineTypeId`, { params });
        }
        GetDoctorMedicinePotencyById(modal: any): Observable<any> {
          const endpoint = `${this.apiUrl}/GetDoctorMedicinePotencyById`;
          return this.http.post<any>(endpoint, modal).pipe( 
            finalize(() => {
              console.log("API call completed");
            })
          );
        }
        addEditDoctorMedicines(modal: any): Observable<any> {
          const endpoint = `${this.apiUrl}/CreateDoctorMedicineMapping`;
          return this.http.post<any>(endpoint, modal).pipe( 
            finalize(() => {
              console.log("API call completed");
            })
          );
        }

        GetDoctorMedicineMapping(medicineId: string): Observable<any> {
          const params = new HttpParams().set('medicineId', medicineId);
          return this.http.get<any>(`${this.apiUrl}/GetDoctorMedicineMappingList`, { params });
        }
}
