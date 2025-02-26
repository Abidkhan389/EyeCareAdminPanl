import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../auth/services/auth.service';
import { EmployeeService } from '../../employee/services/employee.service';
import { LearningManagementService } from '../services/learning-management.service';
import { FacultySubject } from '../../apiTypes/facultySubject';
import { RepoResponse } from '../../apiTypes/RepoResponse';

@Component({
  selector: 'app-learning-management',
  templateUrl: './learning-management.component.html',
  styleUrl: './learning-management.component.scss',
})
export class LearningManagementComponent implements OnInit {
  facultyList: any = []; // List of all faculty for impersonation
  selectedFaculty: number | null = null; // ID of impersonated faculty
  subjects: any = []; // List of subjects for the selected faculty
  isAdminOrSuperAdmin = false; // Boolean to determine if the user is an Admin/Super Admin
  currentUser!: any;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService,
    private employeeService: EmployeeService,
    private learningMgmtService: LearningManagementService
  ) {}

  ngOnInit(): void {
    this.checkUserRole();
    this.loadFacultyList();
  }

  isActive(route: string[]): boolean {
    const currentUrl = this.router.url;
    const targetUrl = this.router.createUrlTree(route).toString();
    return currentUrl === targetUrl;
  }

  checkUserRole() {
    // Logic to set `isAdminOrSuperAdmin` based on the user role
    this.currentUser = this.authService.getCurrentUser();
    const roles = this.currentUser.roles;
    if (roles.includes('ADMIN') || roles.includes('SUPERADMIN')) {
      this.isAdminOrSuperAdmin = true;
    }
  }

  loadFacultyList() {
    if (this.isAdminOrSuperAdmin) {
      // Load the list of all faculty members if impersonation is allowed
      // Example: this.facultyList = fetchFacultyList();
      this.employeeService.getAllEmployeeForDropDown().subscribe((x) => {
        this.facultyList = x.data;
      });
    } else {
      // Load subjects for the current faculty if not impersonating
      this.loadSubjectsForCurrentFaculty();
    }
  }

  onFacultySelect(facultyId: number) {
    this.selectedFaculty = facultyId;
    this.loadSubjectsForSelectedFaculty(facultyId);
  }

  loadSubjectsForSelectedFaculty(facultyId: number) {
    this.learningMgmtService
      .getFacultySubjects(facultyId)
      .subscribe((x: RepoResponse<FacultySubject[]>) => {
        this.subjects = x.data;
      });
  }

  loadSubjectsForCurrentFaculty() {
    this.selectedFaculty = this.currentUser.id;
    this.loadSubjectsForSelectedFaculty(this.selectedFaculty ?? 0);
  }
}
