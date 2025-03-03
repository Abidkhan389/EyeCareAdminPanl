import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MaterialModule } from 'src/app/material.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { Messages } from 'src/app/shared/Validators/validation-messages';
import * as moment from 'moment';
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Helpers } from 'src/app/_common/_helper/app_helper';
import { Gendertype, MaterialType } from 'src/app/_common/_helper/enum';
import { PatientAppointmentService } from 'src/app/patient-appointment/Services/patient-appointment.service';
import { Patterns } from 'src/app/shared/Validators/patterns';
import { NoWhitespaceValidator } from 'src/app/shared/Validators/validators';
import { showErrorMessage } from 'src/app/_common/messages';
import { ResultMessages } from 'src/app/_common/constant';
import { finalize } from 'rxjs';
@Component({
  selector: 'app-add-edit-patient-appointment',
  standalone: true,
  imports: [MaterialModule,CommonModule,SharedModule],
  templateUrl: './add-edit-patient-appointment.component.html',
  styleUrl: './add-edit-patient-appointment.component.scss'
})
export class AddEditPatientAppointmentComponent {
  isreadOnly: boolean = false;
  PatientForm: FormGroup;
  loading: any;
  validationMessages = Messages.validation_messages;
  PatientList: any;
  DoctorList: any;
  hide = true;
  bloodTypes: string[] = ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-','Others'];
  genderType: { id: string; name: string }[] = [];
  materialType: { id: string; name: string }[] = [];
   // Configuration options
   showSpinners = true; // Show spinners for hours, minutes, and seconds
   showSeconds = true; // Show seconds
   stepHour = 1; // Step value for hours
   stepMinute = 1; // Step value for minutes
   stepSecond = 1; // Step value for seconds
   touchUi = false; // Use touch-friendly UI
   color = 'primary'; // Color of the datetime picker
   enableMeridian = true; // Enable AM/PM selection
   minDate: Date = new Date(); // Today's date
   maxDate: Date = new Date(new Date().setMonth(new Date().getMonth() + 1)); // Next 1 month limit

   
   selectedDate: string = ''; // To store selected date
   selectedTime: string = ''; // To store selected time
  
  constructor(public patientAppointmentService: PatientAppointmentService, private fb: FormBuilder, protected router: Router, private dialogref: MatDialogRef<AddEditPatientAppointmentComponent>,
    private dilog: MatDialog, @Inject(MAT_DIALOG_DATA) public data: any) {
     

    this.genderType =Helpers.enumStringToArray(Gendertype) as { id: string; name: string }[];
    this.materialType = Helpers.enumStringToArray(MaterialType) as { id: string; name: string }[];
  }
  ngOnInit(): void {
    if (this.data.patientId) {
      this.GetPatient()
    }
   
    this.validateform();
    this.GetAllDoctors();
  }
  validateform() {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0'); 
    const minutes = now.getMinutes().toString().padStart(2, '0'); 
    const currentTime = `${hours}:${minutes}`;
    this.PatientForm = this.fb.group({
      firstName: ['', Validators.compose([NoWhitespaceValidator, Validators.required, Validators.pattern(Patterns.titleRegex), Validators.maxLength(30),Validators.minLength(3)])],
      lastName: ['', Validators.compose([NoWhitespaceValidator, Validators.required, Validators.pattern(Patterns.titleRegex), Validators.maxLength(30),Validators.minLength(3)])],
      gender: [null, Validators.required],
      doctorId : [null, Validators.required],
      age: ['', Validators.compose([NoWhitespaceValidator, Validators.required, Validators.pattern(Patterns.Num), Validators.minLength(11), Validators.maxLength(11)])],
      appoitmentTime: [currentTime, Validators.required], 
      phoneNumber: ['', Validators.compose([NoWhitespaceValidator, Validators.required, Validators.pattern(Patterns.Num), Validators.minLength(11), Validators.maxLength(11)])],
      cnic: ['', Validators.compose([NoWhitespaceValidator, Validators.required, Validators.pattern(Patterns.CnicPattern), Validators.minLength(13), Validators.maxLength(13)])],
      city: ['', Validators.compose([NoWhitespaceValidator, Validators.required, Validators.pattern(Patterns.titleRegex), Validators.maxLength(50),Validators.minLength(3)])],
      bloodType: [null],
      maritalStatus: [null],
    });
  }
  GetPatient(){
    this.loading = true;
    this.patientAppointmentService.getpatientAppointmentById(this.data.patientId).pipe(
      finalize(() => {
        this.loading = false;
      }))
      .subscribe(result => {
        if (result) {
          this.PatientForm.patchValue(result);
          if (this.data.IsReadOnly) {
            this.isreadOnly = true;
            this.PatientForm.disable();
          }
        }
      },
        error => {
          showErrorMessage(ResultMessages.serverError);
        });
  }
  GetAllDoctors(){
    this.loading = true;
    this.patientAppointmentService.getAllDoctors().pipe(
      finalize(() => {
        this.loading = false;
      }))
      .subscribe(result => {
        if (result) {
          this.DoctorList = result.data;
        }
      },
        error => {
          showErrorMessage(ResultMessages.serverError);
        });
  }
  AddEdit(){
    this.loading = true;
    // this.addEdituser = this.userForm.value;
    this.handleDateTimeSelection();
    let model = Object.assign({}, this.PatientForm.getRawValue());
    // let phn=Helpers.appendPhoneNumber(this.UserForm.get("mobileNumber").value)
    // if(phn){
    //   model.mobileNumber = phn;
    // }
    if (this.data.userId)
      model.Id = this.data.userId
    this.patientAppointmentService.addEditpatientAppointment(model).subscribe((data: any) => {
      this.dialogref.close(true);
    });

  }
  handleDateTimeSelection() {
    if (!this.PatientForm) {
        console.error("PatientForm is not initialized.");
        return;
    }

    const appointmentTimeControl = this.PatientForm.get("appoitmentTime");

    if (!appointmentTimeControl || !appointmentTimeControl.value) {
        console.error("Appointment time is null or undefined.");
        return;
    }

    const userSelectedDate = new Date(appointmentTimeControl.value);

    // Convert the user-selected date to local DateTime
    userSelectedDate.setMinutes(userSelectedDate.getMinutes() - userSelectedDate.getTimezoneOffset());

    // Format the date as an ISO string
    const isoDateTimeString = userSelectedDate.toISOString();

    // Now, assign the formatted date to the FormGroup
    this.PatientForm.patchValue({ appoitmentTime: isoDateTimeString });
}

  //Its Close The DialogRef Modal
  closeClick() {
    this.dialogref.close();
  }

}
