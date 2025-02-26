import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { EmployeeService } from '../../services/employee.service';
import { SharedModule } from '../../../shared/shared.module';
import {
  AppResourceServiceService,
  ResourceTypes,
} from '../../../../services/app-resource-service.service';
import { CountryCodeService } from '../../../../services/country-code.service';
import { AppResource } from '../../../apiTypes/appResource';
import { AspNetRole } from '../../../apiTypes/aspnetrole';
import { CountryCode } from '../../../apiTypes/countrycode';
import { RepoResponse } from '../../../apiTypes/RepoResponse';

@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrl: './employee-form.component.scss',
})
export class EmployeeFormComponent implements OnInit {
  employeeForm: FormGroup;
  countryCodes!: CountryCode[];
  appresourceIdentificationType!: AppResource[];
  appresourceGender!: AppResource[];
  appresourceMarital!: AppResource[];
  appresourceReligion!: AppResource[];
  selectedCountryCode: string = '';
  filteredCountryCodes: CountryCode[] = [];
  roleList: AspNetRole[] = [];
  isEditMode: boolean = false;
  employeeId: number | null = null;
  isLoading = true;
  //@Output() formStatus = new EventEmitter<boolean>();
  constructor(
    private fb: FormBuilder,
    private employeeService: EmployeeService,

    private router: Router,
    private message: MatSnackBar,
    private countryCodeService: CountryCodeService,
    private resourceservice: AppResourceServiceService,
    private route: ActivatedRoute
  ) {
    this.employeeForm = this.fb.group({
      id: 0,
      heighestEducatioin: ['', Validators.required],
      gpa: ['', Validators.required],
      yearsOfExperience: [0, Validators.required],
      specialty: ['', Validators.required],
      childrenCount: [0, Validators.required],
      monthlySalary: [0, Validators.required],
      sickDays: [0, Validators.required],
      sickDaysAvailable: [0],
      holidayDays: [0, Validators.required],
      holidayDaysAvailable: [0],
      employeeType: ['', Validators.required],
      firstName: ['', Validators.required],
      middleName: [''],
      grandParentName: [''],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      countryCode: ['+1', Validators.required],
      phoneNumber: ['', Validators.required],
      dateOfBirth: [null, Validators.required],
      socialSeucirty: ['', Validators.required],
      identificationType: [0],
      identificationNumber: [''],
      isActive: [true],
      notes: [''],
      citizenShip: [''],
      gender: [0, Validators.required],
      motherName: [''],
      maritalStatus: [0],
      religion: [0],
      placeOfBirth: [''],
      employeeTypeText: [''],
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const id = params['id'];
      if (id) {
        this.isEditMode = true;
        this.employeeId = +id;
        this.loadEmployeeDetails(this.employeeId);
      } else {
        this.isLoading = false;
      }
    });
    this.countryCodes = this.countryCodeService.getCountryCodes();

    this.resourceservice
      .getResource(ResourceTypes.IDENTIFICATIONTYPE)
      .subscribe({
        next: (response: RepoResponse<AppResource[]>) => {
          if (response.success) {
            this.appresourceIdentificationType = response.data;
          }
        },
      });
    this.resourceservice.getResource(ResourceTypes.GENDER).subscribe({
      next: (response: RepoResponse<AppResource[]>) => {
        if (response.success) {
          this.appresourceGender = response.data;
        }
      },
    });
    this.resourceservice.getResource(ResourceTypes.MARITAL).subscribe({
      next: (response: RepoResponse<AppResource[]>) => {
        if (response.success) {
          this.appresourceMarital = response.data;
        }
      },
    });
    this.resourceservice.getResource(ResourceTypes.RELIGION).subscribe({
      next: (response: RepoResponse<AppResource[]>) => {
        if (response.success) {
          this.appresourceReligion = response.data;
        }
      },
    });

    this.resourceservice.getRoles().subscribe({
      next: (response: RepoResponse<AspNetRole[]>) => {
        if (response.success) {
          this.roleList = response.data;
        }
      },
    });
  }

  onSubmit(): void {
    if (this.employeeForm.valid) {
      if (this.isEditMode && this.employeeId) {
        // Update employee
        this.employeeService
          .updateEmployee(this.employeeId, this.employeeForm.value)
          .subscribe({
            next: () => {
              this.showSuccessMessage('Employee updated successfully!');
              this.router.navigate(['./'], { relativeTo: this.route.parent });
            },
            error: (err) => {
              this.showErrorMessage(
                'Failed to update employee: ' + err.message
              );
            },
          });
      } else {
        // Create new employee
        this.employeeService.createEmployee(this.employeeForm.value).subscribe({
          next: () => {
            this.showSuccessMessage('Employee created successfully!');
            this.router.navigate(['./'], { relativeTo: this.route.parent });
          },
          error: (err) => {
            this.showErrorMessage('Failed to create employee: ' + err.message);
          },
        });
      }
    } else {
      this.showErrorMessage('Please fill in all required fields correctly.');
    }
  }
  isValid(): boolean {
    return this.employeeForm.valid;
  }

  // Method to get form data
  getData(): any {
    return this.employeeForm.value;
  }
  public markFormFieldsAsDirty(): void {
    if (this.employeeForm) {
      Object.keys(this.employeeForm.controls).forEach((key) => {
        const control = this.employeeForm.get(key);
        if (control) {
          control.markAsDirty();
          control.updateValueAndValidity();
        }
      });
    }
  }

  SearchCountryCode(value: string): void {
    // Filter the country codes based on search input
    this.filteredCountryCodes = this.countryCodes.filter((option) =>
      option.name.toLowerCase().includes(value.toLowerCase())
    );
  }
  // Function to disable future dates
  disableFutureDates = (current: Date): boolean => {
    // Disable dates that are greater than today
    return current && current > new Date();
  };
  loadEmployeeDetails(id: number): void {
    this.employeeService.getEmployeeById(id).subscribe({
      next: (employeeData) => {
        this.employeeForm.patchValue(employeeData.data);
        this.isLoading = false;
      },
      error: (err) => {
        this.isLoading = false;
        this.showErrorMessage('Failed to load employee data.');
      },
    });
  }
  showSuccessMessage(successMessage: string) {
    this.message.open(successMessage, 'Close', {
      duration: 3000, // Duration in milliseconds
      horizontalPosition: 'center',
      verticalPosition: 'bottom', // or 'top'
      panelClass: ['success-snackbar'], // Optional: for custom styling
    });
  }

  showErrorMessage(failMessage: string) {
    this.message.open(failMessage, 'Retry', {
      duration: 5000, // Duration in milliseconds
      horizontalPosition: 'center',
      verticalPosition: 'bottom', // or 'top'
      panelClass: ['error-snackbar'], // Optional: for custom styling
    });
  }
}
