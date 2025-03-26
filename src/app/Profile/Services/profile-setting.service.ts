import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProfileSettingService {

   private apiUrl = environment.baseUrl + 'Administrator';
  private fileUrl= 'api/File';

  constructor(private http: HttpClient) {}
 
  GetUserProfileByEmailAndId(modal: any): Observable<any> {
    const endpoint = `${this.apiUrl}/GetUserProfileByEmailAndId`;
    return this.http.post<any>(endpoint, modal);
  }
  UpdateUserProfile(modal: any): Observable<any> {
    const endpoint = `${this.apiUrl}/UpdateUserProfile`;
    return this.http.post<any>(endpoint, modal);
    
  }
  fileUpload(modal: FormData): Observable<any> {
    const endpoint = `${this.fileUrl}/FileUpload`;
    return this.http.post<any>(endpoint, modal);
  }
 
}
