import { Injectable } from '@angular/core';
import { RepoResponse } from '../apiTypes/RepoResponse';
import { Observable } from 'rxjs';
import { StudentSubject } from '../apiTypes/studentSubject';
import { ParentPerson } from '../apiTypes/parentperson';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth/services/auth.service';
import { StudentDto } from '../apiTypes/project';

@Injectable({
  providedIn: 'root',
})
export class ParentDashboardService {
  private readonly apiBase = '/api/ParentStudentDashboard';

  constructor(private http: HttpClient, private authService: AuthService) {}

  private hasRole(requiredRoles: string[]): boolean {
    const userRoles = this.authService.getCurrentUser().roles;
    return requiredRoles.some((role) => userRoles.includes(role.toUpperCase()));
  }

  getParentChildren(
    accountId: number | string | undefined | null,
    isImpersonated: boolean = false
  ): Observable<RepoResponse<StudentDto[]>> {
    if (!this.hasRole(['Admin', 'SuperAdmin', 'StudentParent', 'Student'])) {
      throw new Error('Unauthorized');
    }

    return this.http.get<RepoResponse<StudentDto[]>>(
      `${this.apiBase}/GetParentChildren/${accountId}/${isImpersonated}`
    );
  }

  getParentsList(): Observable<RepoResponse<ParentPerson[]>> {
    if (!this.hasRole(['SuperAdmin', 'Admin'])) {
      throw new Error('Unauthorized');
    }

    return this.http.get<RepoResponse<ParentPerson[]>>(
      `${this.apiBase}/GetParentsList`
    );
  }
}
