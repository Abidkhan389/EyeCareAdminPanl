import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap, catchError } from 'rxjs';
import { RepoResponse } from '../../apiTypes/RepoResponse';

@Injectable({
  providedIn: 'root',
})
export class BusRouteService {
  private busRouteSubject = new BehaviorSubject<any[]>([]);

  private apiUrl = 'api/BusRoute';

  constructor(private http: HttpClient) {}

  getBusRoutes(): Observable<RepoResponse<any[]>> {
    return this.http
      .get<RepoResponse<any[]>>(this.apiUrl)
      .pipe(tap((response) => this.busRouteSubject.next(response.data)));
  }
  getBusRouteById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`).pipe(
      catchError((error) => {
        console.error('Error fetching Bus Route:', error);
        throw error;
      })
    );
  }
  createBusRoute(BusRouteData: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, BusRouteData);
  }

  updateBusRoute(id: number, BusRouteData: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, BusRouteData).pipe(
      catchError((error) => {
        console.error('Error updating Bus Route:', error);
        throw error;
      })
    );
  }

  deleteBusRoute(ids: number): Observable<boolean> {
    return this.http.post<boolean>(
      this.apiUrl + '/Delete',
      Array.isArray(ids) ? ids : [ids]
    );
  }
}
