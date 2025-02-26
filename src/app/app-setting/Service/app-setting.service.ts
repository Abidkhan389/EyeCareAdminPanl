import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, Observable, tap } from 'rxjs';
import { RepoResponse } from '../../apiTypes/RepoResponse';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AppSettingService {

  private AppSettingSubject = new BehaviorSubject<any[]>([]);

  private apiUrl = 'api/AppSettings';

  constructor(private http: HttpClient) {}

  getAppSetting(): Observable<RepoResponse<any[]>> {
    return this.http
      .get<RepoResponse<any[]>>(`${this.apiUrl}/GetAppSettingList`)
      .pipe(tap((response) => this.AppSettingSubject.next(response.data)));
  }
  getAppSettingById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`).pipe(
      catchError((error) => {
        console.error('Error fetching App Setting:', error);
        throw error;
      })
    );
  }
  // createBusRoute(BusRouteData: any): Observable<any> {
  //   return this.http.post<any>(this.apiUrl, BusRouteData);
  // }

 
  updateAppSetting(id: number, AppSettingData: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, AppSettingData).pipe(
      catchError((error) => {
        console.error('Error updating App Setting:', error);
        throw error;
      })
    );
  }

  // deleteBusRoute(ids: number): Observable<boolean> {
  //   return this.http.post<boolean>(this.apiUrl+'/Delete', Array.isArray(ids) ? ids : [ids]);
  // }
}
