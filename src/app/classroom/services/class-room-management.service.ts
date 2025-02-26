import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ClassRoomManagementService {
  private classroomSubject = new BehaviorSubject<any[]>([]);
  private apiUrl = 'api/ClassRoomManagement';
  constructor(private http: HttpClient) {}

  getClassRoomManagementById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`).pipe(
      catchError((error) => {
        console.error('Error fetching classroom:', error);
        throw error;
      })
    );
  }
  getClassSubjectFacultyList(id: number): Observable<any> {
    return this.http
      .get<any>(`${this.apiUrl}/GetSubjectFacultyList/${id}`)
      .pipe(
        catchError((error) => {
          console.error('Error fetching classroom:', error);
          throw error;
        })
      );
  }
  createClassRoomManagement(ClassRoomManagementData: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, ClassRoomManagementData);
  }
  updateClassRoomManagement(
    id: number,
    ClassRoomManagementData: any
  ): Observable<any> {
    return this.http
      .put<any>(`${this.apiUrl}/${id}`, ClassRoomManagementData)
      .pipe(
        catchError((error) => {
          console.error('Error updating ClassRoomManagement:', error);
          throw error;
        })
      );
  }
}
