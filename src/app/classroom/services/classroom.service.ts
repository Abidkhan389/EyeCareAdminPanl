import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable,BehaviorSubject, tap, map, catchError } from 'rxjs';
import { ClassRoom } from '../../apiTypes/classroom';
import { RepoResponse } from '../../apiTypes/RepoResponse';


@Injectable({
  providedIn: 'root'
})
export class ClassroomService {
  private classroomSubject = new BehaviorSubject<ClassRoom[]>([]);
  private apiUrl= 'api/ClassRoom';

  constructor(private http: HttpClient) {}

  getClassRooms(): Observable<RepoResponse<ClassRoom[]>> {
    return this.http.get<RepoResponse<ClassRoom[]>>(this.apiUrl).pipe(
      tap((response) => this.classroomSubject.next(response.data)));
  }
  getClassRoomById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`).pipe(
      catchError((error) => {
        console.error('Error fetching classroom:', error);
        throw error;
      })
    );
  }
  getClassRoomByIdForView(id: number): Observable<any> {
    const url = `${this.apiUrl}/GetClassRoomForView?id=${id}`;
    return this.http.get<any>(url).pipe(
      catchError((error) => {
        console.error('Error fetching classroom:', error);
        throw  error; // Improved error handling
      })
    );
  }
  
  createClassRoom(classRoomData: ClassRoom): Observable<ClassRoom> {
    return this.http.post<ClassRoom>(this.apiUrl, classRoomData);
  }

  updateClassRoom(id: number, classRoomData: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, classRoomData).pipe(
      catchError((error) => {
        console.error('Error updating classRoom:', error);
        throw error;
      })
    );
  }

  deleteClassRoom(ids: any): Observable<boolean> {
     return this.http.post<boolean>(this.apiUrl+'/Delete', Array.isArray(ids) ? ids : [ids]);
  }
}
