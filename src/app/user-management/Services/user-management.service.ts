import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, finalize, Observable, throwError } from 'rxjs';
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
    const endpoint = `${this.apiUrl}/ActiveInactive`;
    return this.http.post<any>(endpoint, modal).pipe(
      finalize(() => {
        console.log("API call completed");
      })
    );
  }
  getUserById(modal: any): Observable<any> {
    const params = new HttpParams().set('userId', modal.id);

    const endpoint = `${this.apiUrl}/GetUserById`;
    return this.http.get<any>(endpoint, { params }).pipe(
      finalize(() => {
        console.log("API call completed");
      })
    );
  }
  getAllRoles(): Observable<any> {
    const endpoint = `${this.apiUrl}/GetAllRoles`;
    return this.http.get<any>(endpoint).pipe(
      catchError(error => {
        console.error("Error fetching roles:", error);
        return throwError(() => error);
      }),
      finalize(() => console.log("API call completed"))
    );
  }

  addEditUser(modal: any): Observable<any> {
    const endpoint = `${this.apiUrl}/AddEditUser`;
    return this.http.post<any>(endpoint, modal).pipe(
      finalize(() => {
        console.log("API call completed");
      })
    );
  }

  
}
