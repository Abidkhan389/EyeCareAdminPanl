import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, tap } from 'rxjs';
import { Vendor } from '../../apiTypes/vendor';
import { HttpClient } from '@angular/common/http';
import { RepoResponse } from '../../apiTypes/RepoResponse';

@Injectable({
  providedIn: 'root',
})
export class VendorServiceService {
  private vendorSubject = new BehaviorSubject<Vendor[]>([]);

  private apiUrl = 'api/Vendor';

  constructor(private http: HttpClient) {}

  getVendors(): Observable<RepoResponse<Vendor[]>> {
    return this.http
      .get<RepoResponse<Vendor[]>>(this.apiUrl)
      .pipe(tap((response) => this.vendorSubject.next(response.data)));
  }
  getvendorById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`).pipe(
      catchError((error) => {
        console.error('Error fetching vendor:', error);
        throw error;
      })
    );
  }
  createvendor(vendorData: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, vendorData);
  }

 
  updatevendor(id: number, vendorData: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, vendorData).pipe(
      catchError((error) => {
        console.error('Error updating vendor:', error);
        throw error;
      })
    );
  }

  deletevendor(ids: number): Observable<boolean> {
    return this.http.post<boolean>(this.apiUrl+'/Delete', Array.isArray(ids) ? ids : [ids]);
  }
}
