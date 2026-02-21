import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, tap, throwError } from 'rxjs';
import { APIPaths } from '../constant';
import { IdoctorDto } from '../_interfaces/doctor/IdoctorDto';

@Injectable({
  providedIn: 'root'
})
export class LookUpService extends ApiService {

  constructor(private http: HttpClient) {
    super(http);
  }
  getAllDoctors(): Observable<IdoctorDto[]> {
    return this.service<IdoctorDto[]>(
      this.get(APIPaths.getAllDoctors)
    ).pipe(
      map(payload => this.processPayload(payload))
    );
  }
}
