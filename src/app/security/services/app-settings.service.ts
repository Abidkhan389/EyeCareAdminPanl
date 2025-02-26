import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { RepoResponse } from '../../apiTypes/RepoResponse';
import {
  AppSettingsDto,
  PayPeriodDropdownItem,
} from '../../apiTypes/appSettings';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AppSettingsService {
  private appSettingsSubject = new BehaviorSubject<AppSettingsDto | null>(null);
  private payPeriodsSubject = new BehaviorSubject<PayPeriodDropdownItem[]>([]);
  private apiUrl = 'api/appsettings';
  constructor(private readonly http: HttpClient) {}

  getAppSettings(): Observable<RepoResponse<AppSettingsDto>> {
    return this.http
      .get<RepoResponse<AppSettingsDto>>(this.apiUrl)
      .pipe(tap((response) => this.appSettingsSubject.next(response.data)));
  }

  getPayPeriods(): Observable<RepoResponse<PayPeriodDropdownItem[]>> {
    return this.http
      .get<RepoResponse<PayPeriodDropdownItem[]>>(
        `${this.apiUrl}/GetPayPeriods`
      )
      .pipe(tap((response) => this.payPeriodsSubject.next(response.data)));
  }
}
