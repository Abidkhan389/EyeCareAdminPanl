import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, finalize } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MedicinetypeService {

  
  private apiUrl = environment.baseUrl + 'Medicinetype';
      constructor(private http: HttpClient) {}
          
          getAllMedicineType(modal: any): Observable<any> {
            const endpoint = `${this.apiUrl}/GetAllByProc`;
            return this.http.post<any>(endpoint, modal);
          }

          updateMedicineTypeStatus(modal: any): Observable<any> {
            const endpoint = `${this.apiUrl}/GetAllByProc`;
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
}
