import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { EmployeePerson } from 'src/app/apiTypes/employee';
import { EmployeeService } from 'src/services/employee.service';

@Component({
  selector: 'app-employee-profile',
  templateUrl: './employee-profile.component.html',
  styleUrl: './employee-profile.component.scss'
})
export class EmployeeProfileComponent {
  employee!: EmployeePerson | undefined;
  isLoading = true;
  isreadOnly= false;
  employeeData !:EmployeePerson;
  employeeForm: FormGroup;
  constructor(
    private route: ActivatedRoute,private fb: FormBuilder,
    private employeeService:EmployeeService ,
  ) {
    
  }
  ngOnInit(): void {
    this.validateForm();
    this.route.params.subscribe((params) => {
      const id = +params['id']; // Get employee ID from the route
      this.loadEmployeeDetails(id);
    });
  }
  validateForm()
  {
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
      socialSecurity: ['', Validators.required],
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

  loadEmployeeDetails(id: number): void {
    this.employeeService.getEmployeeById(id).subscribe({
      next: (response) => {
        this.employeeData= response.data;        
        this.isreadOnly = true;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error fetching employee details:', err);
        this.isLoading = false;
      },
    });
  }
}
