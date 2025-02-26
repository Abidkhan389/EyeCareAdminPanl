import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClassRoomStudentManagementService {

  private classroomSubject = new BehaviorSubject<any[]>([]);
  private apiUrl = 'api/ClassRoomStudentManagement';
  constructor(private http: HttpClient) {}

  getClassRoomStudentManagementById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`).pipe(
      catchError((error) => {
        console.error('Error fetching classroom:', error);
        throw error;
      })
    );
  }
  GetStudentListByClassRoomId(id: number): Observable<any> {
    return this.http
      .get<any>(`${this.apiUrl}/classroomStudents/${id}`)
      .pipe(
        catchError((error) => {
          console.error('Error fetching Student List:', error);
          throw error;
        })
      );
  }
  createClassRoomStudentManagement(ClassRoomManagementData: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, ClassRoomManagementData);
  }
  updateClassRoomStudentManagement(
    id: number,
    ClassRoomManagementData: any
  ): Observable<any> {
    return this.http
      .put<any>(`${this.apiUrl}/${id}`, ClassRoomManagementData)
      .pipe(
        catchError((error) => {
          console.error('Error updating ClassRoomStudentManagement:', error);
          throw error;
        })
      );
  }
}
