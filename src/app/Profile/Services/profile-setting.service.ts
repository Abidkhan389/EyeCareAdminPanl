import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfileSettingService {

  private apiUrl = 'api/Identity';
  private fileUrl= 'api/File';

  constructor(private http: HttpClient) {}
 
  GetUserByIdAsync(modal: any): Observable<any> {
    const endpoint = `${this.apiUrl}/GetUserInfo`;
    return this.http.post<any>(endpoint, modal);
  }
  UpdateUserAsync(modal: any): Observable<any> {
    const endpoint = `${this.apiUrl}/UpdateUserAsync`;
    return this.http.post<any>(endpoint, modal);
    
  }
  fileUpload(modal: FormData): Observable<any> {
    const endpoint = `${this.fileUrl}/FileUpload`;
    return this.http.post<any>(endpoint, modal);
  }
 
}
