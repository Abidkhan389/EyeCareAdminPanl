import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeesService {

  private apiUrl= 'api/EmployeeDashboard';
    constructor(private http: HttpClient) {}

    employeesDashboardData(): Observable<any> {
      return this.http.get<any>(this.apiUrl+'/GetEmployeeDataForDashBoard').pipe(
        catchError((error) => {
          console.error('Error fetching Employees Dashboard:', error);
          throw error;
        })
      );
    }
}
