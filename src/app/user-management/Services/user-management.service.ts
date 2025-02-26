import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { RepoResponse } from 'src/app/apiTypes/RepoResponse';
@Injectable({
  providedIn: 'root'
})
export class UserManagementService {

   private apiUrl = 'api/Identity';
  
    constructor(private http: HttpClient) {}
        GetUserListAsync(): Observable<any> {
          return this.http.get<any>(this.apiUrl + '/GetUserListAsync').pipe(
            catchError((error) => {
              console.error('Error fetching Top Card Dashboard:', error);
              throw error;
            })
          );
        }
        deleteUsers(ids: any): Observable<boolean> {
          return this.http.post<boolean>(this.apiUrl+'/Delete', Array.isArray(ids) ? ids : [ids]);
       }
      AddEditUserAsync(modal: any): Observable<any> {
        const endpoint = `${this.apiUrl}/AddEditUserAsync`;
        return this.http.post<any>(endpoint, modal);
        
      }
       GetUserByIdAsync(userId: string): Observable<any> {
        const endpoint = `${this.apiUrl}/GetUserById?UserId=${userId}`;
        return this.http.get<any>(endpoint);
      }
}
