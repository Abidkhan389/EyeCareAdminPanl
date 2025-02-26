import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentBehaviourService {

   private apiUrl = 'api/StudentBehaviour';
    
      constructor(private http: HttpClient) {}
      GetUstudentBehaviourListAsync(): Observable<any> {
        return this.http.get<any>(this.apiUrl + '/GetUstudentBehaviourListAsync').pipe(
          catchError((error) => {
            console.error('Error fetching Top Card Dashboard:', error);
            throw error;
          })
        );
      }
          StudentBehaviourDeleteAsync(ids: any): Observable<boolean> {
            return this.http.post<boolean>(this.apiUrl+'/StudentBehaviourDeleteAsync', Array.isArray(ids) ? ids : [ids]);
         }
        AddEditstudentBehaviourAsync(modal: any): Observable<any> {
          const endpoint = `${this.apiUrl}/AddEditstudentBehaviourAsync`;
          return this.http.post<any>(endpoint, modal);
          
        }
        AddEditstudentBehaviourAttachementsAsync(modal: any): Observable<any> {
          const endpoint = `${this.apiUrl}/AddEditstudentBehaviourAttachementsAsync`;
          
           return this.http.post<any>(endpoint, modal);
          
        }
        GetBehaviorByIdAsync(studentBehaviour: any): Observable<any> {
          const endpoint = `${this.apiUrl}/GetBehaviorByIdAsync?studentBehaviour=${studentBehaviour}`;
          return this.http.get<any>(endpoint);
        }
        GetBehaviorForViewByIdAsync(studentBehaviour: any): Observable<any> {
          const endpoint = `${this.apiUrl}/GetBehaviorForViewByIdAsync?studentBehaviour=${studentBehaviour}`;
          return this.http.get<any>(endpoint);
        }
        GetBehaviorsByStudentIdAsync(modal: any): Observable<any> {
          const endpoint = `${this.apiUrl}/GetBehaviorsByStudentIdAsync`;
          return this.http.post<any>(endpoint, modal);
          
        }
}
