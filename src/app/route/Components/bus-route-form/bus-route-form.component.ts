import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { BusRouteService } from '../../Services/bus-route.service';
import { Messages } from '../../../shared/Validators/validation-messages';
import { Patterns } from '../../../shared/Validators/patterns';
import { NoWhitespaceValidator } from '../../../shared/Validators/validators';
import { StudentService } from '../../../../services/student.service';
import { EmployeeService } from '../../../employee/services/employee.service';
import { MatSelectionList } from '@angular/material/list';
import { AppResource } from '../../../apiTypes/appResource';
import {
  AppResourceServiceService,
  ResourceTypes,
} from '../../../../services/app-resource-service.service';
import { RepoResponse } from '../../../apiTypes/RepoResponse';

@Component({
  selector: 'app-bus-route-form',
  templateUrl: './bus-route-form.component.html',
  styleUrl: './bus-route-form.component.scss',
})
export class BusRouteFormComponent {
  // Status options for dropdown

  appresourceRouteType!: AppResource[];
  studentListForDropDown!: any[];
  employeeListForDropDown!: any[];
  driverEmployeeListforDropDown !: any[];
  selectedStudents: any[] = [];
  selectedEmployees: any[] = [];
  routeForm!: FormGroup;
  isEdit = false;
  isEditMode: boolean = false;
  routeId: number | null = null;
  isLoading = true;
  validationMessages = Messages.validation_messages;
  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private BusRouteService: BusRouteService,
    private router: Router,
    private message: MatSnackBar,
    private studentService: StudentService,
    private employeeService: EmployeeService,
    private resourceservice: AppResourceServiceService
  ) {}
  ngOnInit() {
    this.validateform();
    this.route.params.subscribe((params) => {
      const id = params['id'];
      if (id) {
        this.isEditMode = true;
        this.isEdit = true;
        this.routeId = +id;
        this.loadRouteDetails(this.routeId);
      } 
    });
    this.route.params.subscribe((params) => {
      const id = params['id'];
      if (id) {
        this.isEditMode = true;
        //load vendor to edit
      }
      else{
        this.isLoading=false;
      }
    });
    this.studentService.getAllStudentForDropDown().subscribe({
      next: (schoolyeardataData: { data: any }) => {
        // Explicitly define the type for studentData
        this.studentListForDropDown = schoolyeardataData.data;
      },
      error: (err: any) => {
        // Explicitly define the type for err
        this.isLoading = false;
        this.showErrorMessage('Failed to load StudentList for dropdown.');
      },
    });

    // this.employeeService.getAllEmployeeForDropDown().subscribe({
    //   next: (schoolyeardataData: { data: any }) => {
    //     // Explicitly define the type for studentData
    //     this.employeeListForDropDown = schoolyeardataData.data;
    //   },
    //   error: (err: any) => {
    //     // Explicitly define the type for err
    //     this.isLoading = false;
    //     this.showErrorMessage('Failed to load employeeList for dropdown.');
    //   },
    // });
    this.resourceservice.getResource(ResourceTypes.RouteType).subscribe({
      next: (response: RepoResponse<AppResource[]>) => {
        if (response.success) {
          this.appresourceRouteType = response.data;
        }
      },
    });
    this.getAllTeacherEmployeesForRoute();
    this.getAllDriverEmployeesForRoute();
  }
  validateform() {
    
    this.routeForm = this.fb.group({
      busRouteId: [null],
      routeName: [
        '',
        Validators.compose([
          NoWhitespaceValidator,
          Validators.required,
          Validators.pattern(Patterns.titleRegex),
          Validators.maxLength(100),
        ]),
      ],
      description: [
        '',
        Validators.compose([
          NoWhitespaceValidator,
          Validators.required,
          Validators.pattern(Patterns.titleRegex),
          Validators.maxLength(100),
        ]),
      ],
      departureTime: ['00:00:00', Validators.required], // Initial default TimeSpan format
      finishTime: ['00:00:00', Validators.required], // Initial default TimeSpan format
      studentids: this.fb.array([]),
      employeeIds: this.fb.array([]),
      statusId: [null, Validators.required],
      driverId: [null, Validators.required],
      currentLocation: [
        '',
        Validators.compose([
          NoWhitespaceValidator,
          Validators.required,
          Validators.pattern(Patterns.titleRegex),
          Validators.maxLength(100),
        ]),
      ],
    });
  }
  getAllTeacherEmployeesForRoute()
  {
    this.employeeService.getAllTeacherEmployeesForRoute().subscribe({
      next: (Data: { data: any }) => {
        // Explicitly define the type for studentData
        this.employeeListForDropDown = Data.data; 
      },
      error: (err: any) => {
        // Explicitly define the type for err
       // this.isLoading = false;
        this.showErrorMessage('Failed to load Teacher Employee List for dropdown.');
      },
    });

  }
  getAllDriverEmployeesForRoute(){
    this.employeeService.getAllDriverEmployeesForRoute().subscribe({
      next: (Data: { data: any }) => {
        // Explicitly define the type for studentData
        this.driverEmployeeListforDropDown = Data.data;
        //this.isLoading=false;
      },
      error: (err: any) => {
        // Explicitly define the type for err
        this.isLoading = false;
        this.showErrorMessage('Failed to load Driver Employee List for dropdown.');
      },
    });
  }

  // Methods to get FormArrays for Students and Employees
  get studentids(): FormArray {
    return this.routeForm.get('studentids') as FormArray;
  }

  get employeeIds(): FormArray {
    return this.routeForm.get('employeeIds') as FormArray;
  }

  moveSelectedStudents(studentId: any) {
    const selected = studentId.selectedOptions.selected.map(
      (option: { value: any }) => option.value
    );

    // Fetching student objects based on selected IDs
    const selectedStudents = this.studentListForDropDown.filter((student) =>
      selected.includes(student.studentId)
    ); // Assuming student has an 'id' property

    this.selectedStudents.push(...selectedStudents);

    // Filter out the selected students from the dropdown list
    this.studentListForDropDown = this.studentListForDropDown.filter(
      (student) => !selected.includes(student.studentId)
    );

    studentId.deselectAll();
  }

  moveBackStudents(selectedstudentId: any) {
    const selected = selectedstudentId.selectedOptions.selected.map(
      (option: { value: any }) => option.value
    );

    // Fetching Employee objects based on selected IDs
    const selectedStudents = this.selectedStudents.filter((student) =>
      selected.includes(student.studentId)
    ); // Assuming selectedStudents have an 'id' property

    this.studentListForDropDown.push(...selectedStudents);

    // Remove the selected Employee from the selectedEmployee array
    this.selectedStudents = this.selectedStudents.filter(
      (student) => !selected.includes(student.studentId)
    );

    selectedstudentId.deselectAll();
  }
  EmployeemoveSelected(employeeId: any) {
    const selected = employeeId.selectedOptions.selected.map(
      (option: { value: any }) => option.value
    );

    // Fetching employee objects based on selected IDs
    const selectedEmployees = this.employeeListForDropDown.filter((emp) =>
      selected.includes(emp.employeeId)
    );

    this.selectedEmployees.push(...selectedEmployees);

    // Filter out the selected employees from the dropdown list
    this.employeeListForDropDown = this.employeeListForDropDown.filter(
      (emp) => !selected.includes(emp.employeeId)
    );

    employeeId.deselectAll();
  }

  EmployeemoveBack(selectedEmployeesId: any) {
    const selected = selectedEmployeesId.selectedOptions.selected.map(
      (option: { value: any }) => option.value
    );

    // Fetching employee objects based on selected IDs
    const selectedEmployees = this.selectedEmployees.filter((emp) =>
      selected.includes(emp.employeeId)
    );

    this.employeeListForDropDown.push(...selectedEmployees);

    // Remove the selected employees from the selectedEmployees array
    this.selectedEmployees = this.selectedEmployees.filter(
      (emp) => !selected.includes(emp.employeeId)
    );

    selectedEmployeesId.deselectAll();
  }

  // EmployeemoveSelected(employeeId: any) {
  //   const selected = employeeId.selectedOptions.selected.map((option: { value: any; }) => option.value);
  //   // Fetching student objects based on selected IDs
  //   const selectedEmployees = this.employeeListForDropDown.filter(emp => selected.includes(emp.employeeId)); // Assuming student has an 'id' property
  //   this.selectedEmployees.push(...selectedEmployees);

  //   this.employeeListForDropDown = this.employeeListForDropDown.filter(emp => !selected.includes(emp));
  //   employeeId.deselectAll();
  // }

  // EmployeemoveBack(selectedEmployeesId: any) {
  //   const selected = selectedEmployeesId.selectedOptions.selected.map((option: { value: any; }) => option.value);

  //   // Fetching Employee objects based on selected IDs
  //   const selectedEmployees = this.selectedEmployees.filter(emp => selected.includes(emp.employeeId)); // Assuming selectedStudents have an 'id' property

  //   this.employeeListForDropDown.push(...selectedEmployees);

  //   this.selectedEmployees = this.selectedEmployees.filter(emp => !selected.includes(emp));
  //   selectedEmployeesId.deselectAll();
  // }
  // Method to map selected students onto the studentids form array
  // Method to map selected students onto the studentids form array
  mapSelectedStudentsToForm() {
    // Ensure studentids form array is not null before proceeding
    if (this.studentids) {
      // Remove duplicate students from selectedStudents based on studentId
      const uniqueStudents = this.selectedStudents.filter(
        (student, index, self) =>
          index === self.findIndex((s) => s.studentId === student.studentId)
      );

      // Loop through the unique students and add them to the form if not already present
      uniqueStudents.forEach((student) => {
        // Check if the studentId is already present in the studentids form array
        const exists = this.studentids?.controls.some(
          (control) => control.get('studentId')?.value === student.studentId
        );

        // If the studentId is not present, add the new form group
        if (!exists) {
          const studentForm = this.fb.group({
            id: [student.id || null], // Set the student id if available
            studentId: [student.studentId || null, Validators.required], // Set the studentId from the selected list
            routeId: [student.routeId || null], // Set routeId if applicable
          });

          // Push the new student form group to the studentids form array
          this.studentids?.push(studentForm); // Use safe navigation operator
        }
      });
    }
  }

  // Method to add a new employee to the employeeIds array
  mapSelectedaddEmployee() {
    // Remove duplicate employees from selectedEmployees based on employeeId
    const uniqueEmployees = this.selectedEmployees.filter(
      (emp, index, self) =>
        index === self.findIndex((e) => e.employeeId === emp.employeeId)
    );

    // Loop through the unique employees and add them to the form if not already present
    uniqueEmployees.forEach((emp) => {
      // Check if the employeeId is already present in the employeeIds form array
      const exists = this.employeeIds.controls.some(
        (control) => control.get('employeeId')?.value === emp.employeeId
      );

      // If the employeeId is not present, add the new form group
      if (!exists) {
        const employeeForm = this.fb.group({
          id: [emp.id || null], // Set the employee id if available
          employeeId: [emp.employeeId || null, Validators.required], // Set the employeeId from the selected list
          routeId: [emp.routeId || null], // Set routeId if applicable
        });

        // Push the new employee form group to the employeeIds form array
        this.employeeIds.push(employeeForm);
      }
    });
  }

  // convertToTimeSpan(time: string): string {
  //   const [hours, minutes] = time.split(':');
  //   return `${hours}:${minutes}:00`;
  // }
  // Convert hh:mm AM/PM to hh:mm:ss for backend
  convertToTimeSpan(time: string): string {
    const [timePart, period] = time.split(' ');
    let [hours, minutes] = timePart.split(':').map(Number);

    // Convert to 24-hour format if period is PM
    if (period.toLowerCase() === 'pm' && hours < 12) {
      hours += 12;
    } else if (period.toLowerCase() === 'am' && hours === 12) {
      hours = 0; // 12 AM is 00:00 in 24-hour format
    }

    return `${hours.toString().padStart(2, '0')}:${minutes
      .toString()
      .padStart(2, '0')}:00`;
  }

  // Method to submit the form
  onSubmit(): void {
    this.mapSelectedStudentsToForm();
    this.mapSelectedaddEmployee();
    if (this.routeForm.valid) {
      this.routeForm.patchValue({
        departureTime: this.convertToTimeSpan(
          this.routeForm.value.departureTime
        ),
        finishTime: this.convertToTimeSpan(this.routeForm.value.finishTime),
      });
      if (this.isEditMode && this.routeId) {
        // Update employee
        this.routeForm.patchValue({
          address: 'addresisstatic',
        });
        this.BusRouteService.updateBusRoute(
          this.routeId,
          this.routeForm.value
        ).subscribe({
          next: () => {
            this.showSuccessMessage('Route updated successfully!');
            this.router.navigate(['./'], { relativeTo: this.route.parent });
          },
          error: (err) => {
            this.showErrorMessage('Failed to update Route: ' + err.message);
          },
        });
      } else {
        // Create new employee
        this.BusRouteService.createBusRoute(this.routeForm.value).subscribe({
          next: () => {
            this.showSuccessMessage('Route created successfully!');
            this.router.navigate(['./'], { relativeTo: this.route.parent });
          },
          error: (err) => {
            this.showErrorMessage('Failed to create Route: ' + err.message);
          },
        });
      }
    } else {
      this.showErrorMessage('Please fill in all required fields correctly.');
    }
  }
  isValid(): boolean {
    return this.routeForm.valid;
  }
  public markFormFieldsAsDirty(): void {
    if (this.routeForm) {
      Object.keys(this.routeForm.controls).forEach((key) => {
        const control = this.routeForm.get(key);
        if (control) {
          control.markAsDirty();
          control.updateValueAndValidity();
        }
      });
    }
  }
  // Convert hh:mm:ss format to hh:mm AM/PM for editing
  convertToAmPm(time: string): string {
    const [hours, minutes] = time.split(':').map(Number);
    const period = hours >= 12 ? 'PM' : 'AM';
    const hour = hours % 12 || 12; // Convert 24-hour to 12-hour format
    return `${hour}:${minutes.toString().padStart(2, '0')} ${period}`;
  }
  loadRouteDetails(id: number): void {
    this.BusRouteService.getBusRouteById(id).subscribe({
      next: (BusRouteData) => {
        // Convert TimeSpan to AM/PM format for both departureTime and finishTime
        BusRouteData.data.departureTime = this.convertToAmPm(
          BusRouteData.data.departureTime
        );
        BusRouteData.data.finishTime = this.convertToAmPm(
          BusRouteData.data.finishTime
        );
        // Patch student IDs
        this.selectedStudents = BusRouteData.data.studentids;
        this.selectedEmployees = BusRouteData.data.employeeIds;
        // Filter out selected students and employees from dropdown lists
        this.studentListForDropDown = this.studentListForDropDown.filter(
          (student) =>
            !this.selectedStudents.some(
              (selectedStudent) =>
                selectedStudent.studentId === student.studentId
            )
        );
        this.employeeListForDropDown = this.employeeListForDropDown.filter(
          (employee) =>
            !this.selectedEmployees.some(
              (selectedEmployee) =>
                selectedEmployee.employeeId === employee.employeeId
            )
        );
        this.routeForm.patchValue(BusRouteData.data);
        this.isEdit = false;
        this.isLoading = false;

      },
      error: (err) => {
        this.isLoading = false;
        this.showErrorMessage('Failed to load Route data.');
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
