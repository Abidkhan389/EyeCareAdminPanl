import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, catchError, Observable, tap } from 'rxjs';
import { EmployeePerson } from '../../apiTypes/employee';
import { RepoResponse } from '../../apiTypes/RepoResponse';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  private employeeSubject = new BehaviorSubject<EmployeePerson[]>([]);
  private employeeEditSubject: BehaviorSubject<EmployeePerson | null>;
  private apiUrl = 'api/employee';

  constructor(private http: HttpClient) {
    this.employeeEditSubject = new BehaviorSubject<EmployeePerson | null>(null);
  }

  getEmployees(): Observable<RepoResponse<EmployeePerson[]>> {
    return this.http
      .get<RepoResponse<EmployeePerson[]>>(this.apiUrl)
      .pipe(tap((response) => this.employeeSubject.next(response.data)));
  }

  getEmployeeById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`).pipe(
      catchError((error) => {
        console.error('Error fetching employee:', error);
        throw error;
      })
    );
  }

  createEmployee(employeeData: EmployeePerson): Observable<EmployeePerson> {
    return this.http.post<EmployeePerson>(this.apiUrl, employeeData);
  }

  updateEmployee(id: number, employeeData: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, employeeData).pipe(
      catchError((error) => {
        console.error('Error updating employee:', error);
        throw error;
      })
    );
  }
  deleteEmployee(ids: any): Observable<boolean> {
    return this.http.post<boolean>(this.apiUrl+'/Delete', Array.isArray(ids) ? ids : [ids]);
  }
  getAllEmployeeForDropDown():Observable<RepoResponse<any[]>>{
    return this.http
      .get<RepoResponse<any[]>>(`${this.apiUrl}/GetAllEmployeesForDropDown`);
  }
  getAllTeacherEmployeesForRoute():Observable<RepoResponse<any[]>>{
    return this.http
      .get<RepoResponse<any[]>>(`${this.apiUrl}/GetAllTeacherEmployeesForRoute`);
  }
  getAllDriverEmployeesForRoute():Observable<RepoResponse<any[]>>{
    return this.http
      .get<RepoResponse<any[]>>(`${this.apiUrl}/GetAllDriverEmployeesForRoute`);
  }
}
