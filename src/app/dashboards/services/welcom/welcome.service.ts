import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, Observable, tap } from 'rxjs';
import { RepoResponse } from 'src/app/apiTypes/RepoResponse';

@Injectable({
  providedIn: 'root'
})
export class WelcomeService {
 
  private apiUrl= 'api/Welcome';
  private apiUrlRevenueForCast= 'api/RevenueForCast';

  constructor(private http: HttpClient) {}

  getCurrentWeekAndMonthCount(modal: any): Observable<any> {
    const endpoint = `${this.apiUrl}/CurrentWeekMonthWeekPatientCount`;
    return this.http.post<any>(endpoint, modal);
  }
  WelcomeDashboardIncomeData(): Observable<any> {
    return this.http.get<any>(this.apiUrl).pipe(
      catchError((error) => {
        console.error('Error fetching RevenueForCast On Dashboard:', error);
        throw error;
      })
    );
  }
  WelcomeRevenueForCast(): Observable<any> {
    return this.http.get<any>(this.apiUrlRevenueForCast).pipe(
      catchError((error) => {
        console.error('Error fetching Welcome Dashboard:', error);
        throw error;
      })
    );
  }

  WelcomeTopCardService(): Observable<any> {
    return this.http.get<any>(this.apiUrlRevenueForCast + '/StudentDetailsForDashBoard').pipe(
      catchError((error) => {
        console.error('Error fetching Top Card Dashboard:', error);
        throw error;
      })
    );
  }
}
