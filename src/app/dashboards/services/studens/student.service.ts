import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
 
  private apiUrl= 'api/StudentDashboard';

  constructor(private http: HttpClient) {}


  studentDashboardData(): Observable<any> {
    return this.http.get<any>(this.apiUrl).pipe(
      catchError((error) => {
        console.error('Error fetching Student Dashboard:', error);
        throw error;
      })
    );
  }
}
