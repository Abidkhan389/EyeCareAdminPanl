import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RepoResponse } from '../app/apiTypes/RepoResponse';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { AppResource } from '../app/apiTypes/appResource';
import { AspNetRole } from '../app/apiTypes/aspnetrole';

export enum ResourceTypes {
  RELIGION = 0,
  GENDER = 1,
  MARITAL = 2,
  IDENTIFICATIONTYPE = 3,
  PaymentPlanType = 4,
  SchoolYearPeriod = 5,
  RouteType=6
}

@Injectable({
  providedIn: 'root'
})
export class AppResourceServiceService {

  private appResourceSubject = new BehaviorSubject<AppResource[]>([]);
  private RolesSubject = new BehaviorSubject<AspNetRole[]>([]);
  private apiUrl = 'api/AppResource?resourceType=';
  private apiUrlUser = 'api/AppResource/';

  constructor(private http: HttpClient) { }

  getResource(resourceType : ResourceTypes): Observable<RepoResponse<AppResource[]>> {
    return this.http.get<RepoResponse<AppResource[]>>(this.apiUrl + resourceType).pipe(
      tap((response) => this.appResourceSubject.next(response.data)));
  }

  getRoles(): Observable<RepoResponse<AspNetRole[]>> {
    return this.http.get<RepoResponse<AspNetRole[]>>(this.apiUrlUser + 'GetRoles').pipe(
      tap((response) => this.RolesSubject.next(response.data)));
  }
  getAccounts(): Observable<RepoResponse<any[]>> {
    return this.http.get<RepoResponse<any[]>>(this.apiUrlUser + 'AccountList').pipe(
      tap((response) => this.RolesSubject.next(response.data)));
  }
}
