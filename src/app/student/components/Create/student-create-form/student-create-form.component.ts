import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from '../../../../shared/services/alert.service';
import { LoadingService } from '../../../../shared/services/loading.service';
import { StudentService } from '../../../services/student.service';
import { Patterns } from '../../../../shared/Validators/patterns';
import { NoWhitespaceValidator } from '../../../../shared/Validators/validators';
import { Messages } from '../../../../shared/Validators/validation-messages';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AppResource } from '../../../../apiTypes/appResource';
import { ClassRoom } from '../../../../apiTypes/classroom';
import { CountryCode } from '../../../../apiTypes/countrycode';
import { Student } from '../../../../apiTypes/student';
import { CountryCodeService } from '../../../../../services/country-code.service';
import {
  AppResourceServiceService,
  ResourceTypes,
} from '../../../../../services/app-resource-service.service';
import { ClassroomService } from '../../../../classroom/services/classroom.service';
import { MatSelectChange } from '@angular/material/select';

@Component({
  selector: 'app-student-create-form',
  templateUrl: './student-create-form.component.html',
  styleUrl: './student-create-form.component.scss',
})
export class StudentCreateFormComponent implements OnInit, OnChanges {
  studentForm!: FormGroup;
  @Input() studentData!: Student;
  @Output() accountToggle = new EventEmitter<boolean>();
  maxDate: Date;
  isEditMode: boolean = false;
  isEdit = false;
  isLoading = true;
  HasAlreadyAccount: boolean = false;
  accouuntSelected: boolean = false;
  studentId: number | null = null;
  countryCodes!: CountryCode[];
  classrooms!: ClassRoom[];
  appresourceIdentificationType!: AppResource[];
  appresourceGender!: AppResource[];
  appresourceMarital!: AppResource[];
  appresourceReligion!: AppResource[];
  selectedCountryCode: string = '';
  filteredCountryCodes: CountryCode[] = [];
  validationMessages = Messages.validation_messages;
  accountsList: any[] = [];
  filteredAccounts: any[] = []; // This will hold the filtered accounts
  searchText: string = ''; // For storing the search text
  constructor(
    private fb: FormBuilder,
    private countryCodeService: CountryCodeService,
    private classroomservice: ClassroomService,
    private resourceservice: AppResourceServiceService,
    private studentService: StudentService,
    private loadingService: LoadingService,
    private message: MatSnackBar,
    private router: Router,
    private alertService: AlertService,
    private route: ActivatedRoute
  ) {
    this.maxDate = new Date();
    this.studentForm = this.fb.group({
      id: 0,
      gradeId: [null, Validators.required],
      gradeLabel: [''],
      firstName: [
        '',
        Validators.compose([
          NoWhitespaceValidator,
          Validators.required,
          Validators.pattern(Patterns.titleRegex),
          Validators.maxLength(100),
        ]),
      ],
      middleName: [
        '',
        Validators.compose([
          NoWhitespaceValidator,
          Validators.pattern(Patterns.titleRegex),
          Validators.maxLength(100),
        ]),
      ],
      grandParentName: [
        '',
        Validators.compose([
          NoWhitespaceValidator,
          Validators.pattern(Patterns.titleRegex),
          Validators.maxLength(100),
        ]),
      ],
      lastName: [
        '',
        Validators.compose([
          NoWhitespaceValidator,
          Validators.required,
          Validators.pattern(Patterns.titleRegex),
          Validators.maxLength(100),
        ]),
      ],
      countryCode: [
        '+1',
        Validators.compose([NoWhitespaceValidator, Validators.required]),
      ],
      phoneNumber: [
        '',
        Validators.compose([
          NoWhitespaceValidator,
          Validators.required,
          Validators.pattern(Patterns.Num),
          Validators.maxLength(12),
        ]),
      ],
      dateOfBirth: [null, Validators.required],
      socialSeucirty: ['', Validators.compose([NoWhitespaceValidator])],
      identificationType: [0],
      identificationNumber: ['', Validators.compose([NoWhitespaceValidator])],
      isActive: [true,Validators.required],
      notes: ['', Validators.compose([NoWhitespaceValidator])],
      citizenShip: ['', Validators.compose([NoWhitespaceValidator])],
      gender: [0],
      motherName: [
        '',
        Validators.compose([
          NoWhitespaceValidator,
          Validators.pattern(Patterns.titleRegex),
        ]),
      ],
      maritalStatus: [95], // 95 is the N/A marital status
      religion: [0],
      placeOfBirth: ['', Validators.compose([NoWhitespaceValidator])],
      hasAlreadyAccount: [false],
      accountId: [0],
    });
  }

  ngOnInit(): void {
    this.studentForm.statusChanges.subscribe(() => {});
    this.countryCodes = this.countryCodeService.getCountryCodes();
    this.resourceservice.getAccounts().subscribe({
      next: (accountData: { data: any }) => {
        // Explicitly define the type for meterialData
        this.accountsList = accountData.data;
        this.filteredAccounts = this.accountsList; // Initialize with all accounts
      },
      error: (err: any) => {
        // Explicitly define the type for err
        this.showErrorMessage('Failed to load Meterial Data data.');
      },
    });
    this.classroomservice.getClassRooms().subscribe({
      next: (schoolyeardataData: { data: any }) => {
        // Explicitly define the type for studentData
        this.classrooms = schoolyeardataData.data;
      },
      error: (err: any) => {
        // Explicitly define the type for err
        this.showErrorMessage('Failed to load ClassRooms data.');
      },
    });

    this.resourceservice
      .getResource(ResourceTypes.IDENTIFICATIONTYPE)
      .subscribe({
        next: (Data: { data: any }) => {
          // Explicitly define the type for studentData
          this.appresourceIdentificationType = Data.data;
        },
        error: (err: any) => {
          // Explicitly define the type for err
          this.showErrorMessage('Failed to load Identitification data.');
        },
      });
    this.resourceservice.getResource(ResourceTypes.GENDER).subscribe({
      next: (genderData: { data: any }) => {
        // Explicitly define the type for GENDER
        this.appresourceGender = genderData.data;
      },
      error: (err: any) => {
        // Explicitly define the type for err
        this.showErrorMessage('Failed to load Gender data.');
      },
    });
    this.resourceservice.getResource(ResourceTypes.MARITAL).subscribe({
      next: (meterialData: { data: any }) => {
        // Explicitly define the type for meterialData
        this.appresourceMarital = meterialData.data;
      },
      error: (err: any) => {
        // Explicitly define the type for err
        this.showErrorMessage('Failed to load Meterial Data data.');
      },
    });
    this.resourceservice.getResource(ResourceTypes.RELIGION).subscribe({
      next: (religionData: { data: any }) => {
        // Explicitly define the type for RELIGION
        this.appresourceReligion = religionData.data;
      },
      error: (err: any) => {
        // Explicitly define the type for err
        this.showErrorMessage('Failed to load Meterial Data data.');
      },
    });
    if (this.studentData) {
      this.studentForm.patchValue(this.studentData); // Load data if available
    }
    this.isLoading = false;
    this.route.params.subscribe((params) => {
      const id = params['id'];
      if (id) {
        this.isEdit = true;
        //load vendor to edit
      }
    });
  }

  onSubmit(): void {
    if (this.studentForm.valid) {
      if (this.isEditMode && this.studentId) {
        // Update employee
        this.studentForm.patchValue({
          address: 'addresisstatic',
        });
        this.studentService
          .updateStudent(this.studentId, this.studentForm.value)
          .subscribe({
            next: () => {
              this.showSuccessMessage('Student updated successfully!');
              this.router.navigate([''], { relativeTo: this.route.parent });
            },
            error: (err) => {
              this.showErrorMessage('Failed to update Vendor: ' + err.message);
            },
          });
      } else {
        // Create new employee
        this.studentService.createStudent(this.studentForm.value).subscribe({
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
  // Method to get form data
  getData(): any {
    return this.studentForm.value;
  }
  isValid(): boolean {
    return this.studentForm.valid;
  }
  public markFormFieldsAsDirty(): void {
    if (this.studentForm) {
      this.studentForm.markAllAsTouched();
    }
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
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['studentData'] && changes['studentData'].currentValue) {
      this.studentForm.patchValue({
        id: this.studentData.id,
        gradeId: this.studentData.gradeId,
        gradeLabel: this.studentData.gradeLabel,
        firstName: this.studentData.firstName,
        middleName: this.studentData.middleName,
        grandParentName: this.studentData.grandParentName,
        lastName: this.studentData.lastName,
        countryCode: this.studentData.countryCode,
        phoneNumber: this.studentData.phoneNumber,
        dateOfBirth: this.studentData.dateOfBirth,
        socialSecurity: this.studentData.socialSecurity,
        identificationType: this.studentData.identificationType,
        identificationNumber: this.studentData.identificationNumber,
        isActive: this.studentData.isActive,
        notes: this.studentData.notes,
        citizenShip: this.studentData.citizenShip,
        gender: this.studentData.gender,
        motherName: this.studentData.motherName,
        maritalStatus: this.studentData.maritalStatus,
        religion: this.studentData.religion,
        placeOfBirth: this.studentData.placeOfBirth,
      });
    }
  }
  onToggleAlreadyAccount(value: boolean): void {
    if (value === true) {
      this.HasAlreadyAccount = true;

      // Emit the value to the parent component
      //this.accountToggle.emit(this.HasAlreadyAccount);
    } else {
      this.HasAlreadyAccount = false;
      // Emit the value to the parent component
      this.accountToggle.emit(this.HasAlreadyAccount);
      this.studentForm.get('accountId')?.setValue(0);
      this.accouuntSelected = false;
    }
  }
  onAccountSelected(event: MatSelectChange): void {
    this.accountToggle.emit(this.HasAlreadyAccount);
    this.accouuntSelected = true;
    this.searchText = '';
  }
  onSearchChange(event: Event): void {
    const input = event.target as HTMLInputElement; // Type assertion
    this.searchText = input.value;
    this.filteredAccounts = this.accountsList.filter((account) =>
      account.parentFullName
        .toLowerCase()
        .includes(this.searchText.toLowerCase())
    );
  }
}
