import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Patterns } from '../../../../shared/Validators/patterns';
import { NoWhitespaceValidator } from '../../../../shared/Validators/validators';
import { AppResource } from '../../../../apiTypes/appResource';
import { ClassRoom } from '../../../../apiTypes/classroom';
import { AppResourceServiceService, ResourceTypes } from '../../../../../services/app-resource-service.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { StudentAccount } from '../../../../apiTypes/studentaccount';
import { Messages } from '../../../../shared/Validators/validation-messages';
import { ClassroomService } from '../../../../classroom/services/classroom.service';

@Component({
  selector: 'app-accountform',
  templateUrl: './accountform.component.html',
  styleUrl: './accountform.component.scss'
})
export class AccountformComponent implements OnInit,OnChanges {
  studentAccountForm: FormGroup;
  appresourcePaymentPlan!: AppResource[];
  appresourceschoolYearPeriod!: AppResource[];
  classrooms!: ClassRoom[];
  isLoading=false;
  @Input() accountData!: StudentAccount;
  validationMessages = Messages.validation_messages;
  @Output() accountFormValidityChange = new EventEmitter<boolean>();
  
  constructor( private fb: FormBuilder, private resourceservice: AppResourceServiceService,private classroomservice: ClassroomService,
    private message: MatSnackBar,

  ){
    this.studentAccountForm = this.fb.group({
      id: [0],
      studentId: [0],
      annualFee: [null, Validators.required],
      registrationFee: [null, Validators.required],
      transportationFee: [null, Validators.required],
      paymentPlanType: [0, Validators.required],
      schoolYearPeriod: [0, Validators.required],
      isActive: [true, Validators.required],
      recoveryPhone: ['', Validators.compose([NoWhitespaceValidator, Validators.required, Validators.pattern(Patterns.Num), Validators.maxLength(12)])],
      accountEmail: ['', Validators.compose([NoWhitespaceValidator, Validators.required, Validators.pattern(Patterns.emailRegex), Validators.maxLength(150)])],


    });
  }
  ngOnInit(): void {
    this.resourceservice.getResource(ResourceTypes.PaymentPlanType).subscribe({
      next: (accouuntData: { data: any }) => {  // Explicitly define the type for studentData
        this.appresourcePaymentPlan = accouuntData.data;       
      },
      error: (err: any) => {  // Explicitly define the type for err
        this.isLoading = false;
        this.showErrorMessage('Failed to load Payment Plan data.');
      },
    });
    this.resourceservice.getResource(ResourceTypes.SchoolYearPeriod).subscribe({
      next: (schoolyeardataData: { data: any }) => {  // Explicitly define the type for studentData
        this.appresourceschoolYearPeriod = schoolyeardataData.data;
      },
      error: (err: any) => {  // Explicitly define the type for err
        this.isLoading = false;
        this.showErrorMessage('Failed to load School Year Period data.');
      },
    });
    this.classroomservice.getClassRooms().subscribe({
      next: (schoolyeardataData: { data: any }) => {  // Explicitly define the type for studentData
        this.classrooms = schoolyeardataData.data;
      },
      error: (err: any) => {  // Explicitly define the type for err
        this.isLoading = false;
        this.showErrorMessage('Failed to load ClassRooms data.');
      },
    });

    this.emitFormValidity();

    // Listen to status changes and emit the validity
    this.studentAccountForm.statusChanges.subscribe(() => {
      this.emitFormValidity();
    });
  }
  isValid(): boolean {
    return this.studentAccountForm.valid;
  }
   // Method to get form data
   getData(): any {
    return this.studentAccountForm.value;
  }
  showSuccessMessage(successMessage:string) {
    this.message.open(successMessage, 'Close', {
      duration: 3000, // Duration in milliseconds
      horizontalPosition: 'center',
      verticalPosition: 'bottom', // or 'top'
      panelClass: ['success-snackbar'] // Optional: for custom styling
    });
  }
  showErrorMessage(failMessage:string) {
    this.message.open(failMessage, 'Retry', {
      duration: 5000, // Duration in milliseconds
      horizontalPosition: 'center',
      verticalPosition: 'bottom', // or 'top'
      panelClass: ['error-snackbar'] // Optional: for custom styling
    });
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['accountData'] && changes['accountData'].currentValue) {
      this.studentAccountForm.patchValue({
        id: this.accountData.id,
        studentId: this.accountData.studentId,
        gradeId: this.accountData.gradeId,
        annualFee: this.accountData.annualFee,
        registrationFee: this.accountData.registrationFee,
        transportationFee: this.accountData.transportationFee,
        paymentPlanType: this.accountData.paymentPlanType,
        gradeName: this.accountData.gradeName,
        schoolYearPeriod: this.accountData.schoolYearPeriod,
        isActive: this.accountData.isActive,
        recoveryPhone: this.accountData.recoveryPhone,
        accountEmail: this.accountData.accountEmail,
      });
    }
  }
  public markFormFieldsAsDirty(): void {
    if (this.studentAccountForm) {
      this.studentAccountForm.markAllAsTouched();
    }
  }
  // Helper method to emit form validity
  private emitFormValidity(): void {
    const isValid = this.studentAccountForm.valid;
    this.accountFormValidityChange.emit(isValid);
  }

}
