import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, tap, throwError } from 'rxjs';
import { APIPaths } from '../constant';
import { IdoctorDto } from '../_interfaces/doctor/IdoctorDto';
import { showErrorMessage } from '../messages';

@Injectable({
  providedIn: 'root'
})
export class LookUpService extends ApiService {

  constructor(private http: HttpClient) {
    super(http);
  }
  getAllDoctors(): Observable<IdoctorDto[]> {

  const onSuccess = (value: any): IdoctorDto[] => {
    let data = value;

    if (data ) {
      return data.data;
    } else {
      showErrorMessage("No doctors found");
      return [];
    }
  };

  return this.service<IdoctorDto[]>(
    this.get(APIPaths.getAllDoctors)
  ).pipe(
    map(res => this.processPayload(res)),
    map(onSuccess)
  );
}
}
