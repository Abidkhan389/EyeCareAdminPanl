import { LiveAnnouncer } from '@angular/cdk/a11y';
import { ENTER, COMMA } from '@angular/cdk/keycodes';
import { CommonModule } from '@angular/common';
import { Component, Inject, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';
import { Helpers } from 'src/app/_common/_helper/app_helper';
import { DayOfWeek } from 'src/app/_common/_helper/enum';
import { ResultMessages } from 'src/app/_common/constant';
import { showErrorMessage, showSuccessMessage } from 'src/app/_common/messages';
import { AuthService } from 'src/app/auth/services/auth.service';
import { DoctorHolidayService } from 'src/app/doctor-holiday-management/Services/doctor-holiday.service';
import { MaterialModule } from 'src/app/material.module';
import { PatientAppointmentService } from 'src/app/patient-appointment/Services/patient-appointment.service';
import { SharedModule } from 'src/app/shared/shared.module';
import { Patterns } from 'src/app/shared/Validators/patterns';
import { Messages } from 'src/app/shared/Validators/validation-messages';
import { NoWhitespaceValidator } from 'src/app/shared/Validators/validators';

@Component({
  selector: 'app-add-edit-doctor-holidays',
  standalone: true,
  imports: [MaterialModule,CommonModule,SharedModule],
  templateUrl: './add-edit-doctor-holidays.component.html',
  styleUrl: './add-edit-doctor-holidays.component.scss'
})
export class AddEditDoctorHolidaysComponent {
  DoctorHolidayForm: FormGroup;
  loading: any;
  validationMessages = Messages.validation_messages;
  hide = true;
  doctorList: any;
  minDate: Date = new Date(); // Today's date
  maxDate: Date = new Date(new Date().setFullYear(new Date().getFullYear() + 1)); // Next 1 month limit
  lodgedInUserRole:any;
  lodgedInDoctorId:any;
   constructor(private doctorHolidayService: DoctorHolidayService, private fb: FormBuilder, protected router: Router, private dialogref: MatDialogRef<AddEditDoctorHolidaysComponent>,
      private dilog: MatDialog, @Inject(MAT_DIALOG_DATA) public data: any,public patientAppointmentService: PatientAppointmentService
    ,private authService: AuthService) {
  
    }
    ngOnInit(): void {
      const currentUser = this.authService.getCurrentUser();
      this.lodgedInUserRole = currentUser?.roles || [];
      this.lodgedInDoctorId=currentUser.id
      this.validateform();
      this.GetAllDoctors();
      if (this.data.doctorHolidayId) {
        this.GetDoctorHoliday()
      }
    }
    GetAllDoctors(){
      this.loading = true;
      this.patientAppointmentService.getAllDoctors().pipe(
        finalize(() => {
          this.loading = false;
        }))
        .subscribe(result => {
          if (result) {
            this.doctorList = result.data;
          }
        },
          error => {
            showErrorMessage(ResultMessages.serverError);
          });
    }
    validateform(){
 this.DoctorHolidayForm = this.fb.group({
        doctorId : [null, Validators.required],
        fromDate:  ['', Validators.compose([NoWhitespaceValidator, Validators.required])],
        toDate:  ['', Validators.compose([NoWhitespaceValidator, Validators.required])],
        reason: ['', Validators.compose([NoWhitespaceValidator, Validators.required, Validators.pattern(Patterns.titleRegex), Validators.minLength(4), Validators.maxLength(150)])],
      });
    }
    GetDoctorHoliday() {
        this.loading = true;
        let model = Object.assign({});
        model.doctorHolidayId = this.data.doctorHolidayId;
      
        this.doctorHolidayService.getByIdDoctorHoliday(model).pipe(
          finalize(() => {
            this.loading = false; // ✅ Ensures `loading` is reset when the API call completes
          })
        )
        .subscribe(
          (result: any) => { // ✅ Explicitly define type as 'any' to avoid TS7006
            if (result) {
              this.DoctorHolidayForm.patchValue(result.data);
                
            }
          },
          (error: any) => { // ✅ Explicitly define type as 'any' to avoid TS7006
            showErrorMessage(ResultMessages.serverError);
          }
        );
      }
      AddEdit(){
        this.loading = true;
        this.handleDateSelection('fromDate');
        this.handleDateSelection('toDate');
        let model = Object.assign({}, this.DoctorHolidayForm.getRawValue());
        // }
        if (this.data.doctorHolidayId)
          model.doctorHolidayId = this.data.doctorHolidayId
          this.doctorHolidayService.addEditDoctorHoliday(model).subscribe((data: any) => {
          if(data.success)
                     {
                       showSuccessMessage(data.message);
                       this.dialogref.close(true);
                     }
                     else{
                       showErrorMessage(data.message);
                       this.loading = true;
                     }
        });
      }

      handleDateSelection(fieldName: 'fromDate' | 'toDate') {
        const control = this.DoctorHolidayForm.get(fieldName);
        if (!control) return;
      
        const value = control.value;
      
        if (!value) {
          this.DoctorHolidayForm.patchValue({ [fieldName]: null });
          return;
        }
      
        const selectedDate = new Date(value);
        if (isNaN(selectedDate.getTime())) {
          this.DoctorHolidayForm.patchValue({ [fieldName]: null });
          return;
        }
      
        const maxDate = new Date(this.maxDate);
        
        // Restrict date to not exceed maxDate
        if (selectedDate > maxDate) {
          this.DoctorHolidayForm.patchValue({ [fieldName]: this.maxDate });
          return;
        }
      
        selectedDate.setMinutes(selectedDate.getMinutes() - selectedDate.getTimezoneOffset());
        const iso = selectedDate.toISOString();
      
        this.DoctorHolidayForm.patchValue({ [fieldName]: iso });
      }
     //Its Close The DialogRef Modal
   closeClick() {
    this.dialogref.close();
  }

}
