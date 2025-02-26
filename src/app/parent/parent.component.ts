import { Component, Input, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ParentDashboardService } from './parent-dashboard.service';
import { Router } from '@angular/router';
import { StudentDto } from '../apiTypes/project';
import { ParentPerson } from '../apiTypes/parentperson';
import { AuthService } from '../auth/services/auth.service';
import { RepoResponse } from '../apiTypes/RepoResponse';

@Component({
  selector: 'app-parent',
  templateUrl: './parent.component.html',
  styleUrls: ['./parent.component.scss'],
})
export class ParentComponent implements OnInit {
  @Input() title = new BehaviorSubject<string>('Parents');
  parentStudents: StudentDto[] = [];
  parentsList: ParentPerson[] = [];
  selectedParentId: string | number | null | undefined = null;
  currentUserRoles: string[] = [];
  currentUserId: number | string | undefined | null = undefined;

  constructor(
    private parentDashboardService: ParentDashboardService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Get current user roles and ID
    const currentUser = this.authService.getCurrentUser();
    this.currentUserRoles = currentUser.roles;
    this.currentUserId = currentUser.id;

    if (this.isAdminOrSuperAdmin()) {
      // Admin or SuperAdmin: Fetch the parents list for impersonation
      this.parentDashboardService.getParentsList().subscribe((response) => {
        if (response.success) {
          this.parentsList = response.data;
        } else {
          console.error('Error fetching parents list:', response.errors);
        }
      });
    } else {
      // Not Admin or SuperAdmin: Use the current user ID as the parent ID
      this.selectedParentId = this.currentUserId;
      this.populateDashboard(this.selectedParentId);
    }
  }

  isAdminOrSuperAdmin(): boolean {
    return (
      this.currentUserRoles.includes('ADMIN') ||
      this.currentUserRoles.includes('SUPERADMIN')
    );
  }

  onParentSelected(parentId: number): void {
    this.selectedParentId = parentId;
    this.populateDashboard(parentId);
  }

  populateDashboard(parentId: number | string | null | undefined): void {
    // Fetch parent children and other dashboard information
    this.parentDashboardService
      .getParentChildren(parentId, this.isAdminOrSuperAdmin())
      .subscribe((response: RepoResponse<StudentDto[]>) => {
        if (response.success) {
          this.parentStudents = response.data ?? [];
        } else {
          console.error('Error fetching parent children:', response.errors);
        }
      });

    // Additional methods to populate other dashboard info can go here
  }

  navigateToStudentDashboard(studentId: number): void {
    this.router.navigate([`/parent/studentdashboard/${studentId}`]);
  }
}
