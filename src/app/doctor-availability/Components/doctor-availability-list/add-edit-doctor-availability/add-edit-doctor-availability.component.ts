import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';
import { Helpers } from 'src/app/_common/_helper/app_helper';
import { DayOfWeek, DoctorAvailabalTime } from 'src/app/_common/_helper/enum';
import { ResultMessages } from 'src/app/_common/constant';
import { showErrorMessage, showSuccessMessage } from 'src/app/_common/messages';
import { DoctorAvailabilityService } from 'src/app/doctor-availability/Services/doctor-availability.service';
import { MaterialModule } from 'src/app/material.module';
import { PatientAppointmentService } from 'src/app/patient-appointment/Services/patient-appointment.service';
import { SharedModule } from 'src/app/shared/shared.module';
import { Messages } from 'src/app/shared/Validators/validation-messages';
import { NoWhitespaceValidator } from 'src/app/shared/Validators/validators';

@Component({
  selector: 'app-add-edit-doctor-availability',
  standalone: true,
  imports: [MaterialModule, CommonModule, SharedModule],
  templateUrl: './add-edit-doctor-availability.component.html',
  styleUrl: './add-edit-doctor-availability.component.scss'
})
export class AddEditDoctorAvailabilityComponent implements OnInit {
  doctorAvailabilityForm: FormGroup;
  loading: any;
  validationMessages = Messages.validation_messages;
  StartEndTimeOption: any = [];
  doctorappointmentDurationMinutes: { id: number; name: string }[] = [];
  weekDays: { id: number; name: string }[] = [];
  doctorList: any;
  editMode:boolean=false;
  constructor(private doctorAvailabilityService: DoctorAvailabilityService,public patientAppointmentService: PatientAppointmentService, private fb: FormBuilder, protected router: Router, private dialogref: MatDialogRef<AddEditDoctorAvailabilityComponent>,
    private dilog: MatDialog, @Inject(MAT_DIALOG_DATA) public data: any) {
    this.weekDays = Helpers.enumToArray(DayOfWeek) as { id: number; name: string }[];
    this.doctorappointmentDurationMinutes = Helpers.enumToArray(DoctorAvailabalTime) as { id: number; name: string }[];
  }
  ngOnInit(): void {
    if (this.data.id) {
      this.getByIdDoctorAvaibality(this.data.id, (data: { [x: string]: any; doctorTimeSlots?: any; dayIds?: any }) => {
        if (data) {
          this.editMode=true;
          this.doctorAvailabilityForm.patchValue(data);
  
          // ✅ Load dayId from backend into FormArray
        const dayIdsArray = this.doctorAvailabilityForm.get('dayIds') as FormArray;
        dayIdsArray.clear(); // ✅ Clear previous selections

        // ✅ Ensure `dayId` is always an array
        const dayIds = Array.isArray(data['dayId']) ? data['dayId'] : [data['dayId']];
        dayIds.forEach((id: number) => {
          dayIdsArray.push(new FormControl(id));
        });
  
          // ✅ Map `doctorTimeSlots` correctly
          this.StartEndTimeOption = this.doctorAvailabilityForm.get('doctorTimeSlots') as FormArray;
          this.StartEndTimeOption.clear(); // Clear old values before adding new ones
  
          if (data.doctorTimeSlots && Array.isArray(data.doctorTimeSlots)) {
            data.doctorTimeSlots.forEach((slot: any) => {
              this.StartEndTimeOption.push(this.createStartEndTimeOptionForm(slot)); // Add slot
            });
          }
        }
      });
    }
  
    this.validateform();
    this.GetAllDoctors();
  }
  
  getByIdDoctorAvaibality(id: any, callback: any) {
    this.loading = true;
    let model = Object.assign({});
    model.id = id;
    this.doctorAvailabilityService.getByIdDoctorAvaibality(model).pipe(
      finalize(() => {
        this.loading = false;
      })
    ).subscribe(
      result => {
        if (result) {
          callback(result.data);
        }
      },
      error => {
        console.error("Error fetching doctor availability:", error);
        showErrorMessage(ResultMessages.serverError);
      }
    );
  }
  
  validateform() {
    this.doctorAvailabilityForm = this.fb.group({
      doctorId: [null, Validators.required],
      appointmentDurationMinutes: [null, Validators.required],
      dayIds: this.fb.array([]),
      doctorTimeSlots: this.fb.array([]),
    });

  }
  adddoctorTimeSlots(val?: any, type?: any) {
    this.StartEndTimeOption = this.doctorAvailabilityForm.get('doctorTimeSlots') as FormArray;
    this.StartEndTimeOption.push(this.createStartEndTimeOptionForm(val, type));
  }
  createStartEndTimeOptionForm(item?: any, type?: any) {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const currentTime = `${hours}:${minutes}`;
  
    return this.fb.group({
      startTime: [item?.startTime || currentTime, Validators.required], // ✅ Edit case -> use server data, else use current time
      endTime: [item?.endTime || currentTime, Validators.required], // ✅ Edit case -> use server data, else use current time
    });
  }
  
  // Remove start and end time at a specific index
  removeStartEndTimeOption(index: number) {
    this.getStartEndTimeOptionArray().removeAt(index);
  }
  // Get the start and end time FormArray
  getStartEndTimeOptionArray(): FormArray {
    return this.doctorAvailabilityForm.get('doctorTimeSlots') as FormArray;
  }
  onDaySelect(dayId: number, event: any) {
    const dayIdsArray = this.doctorAvailabilityForm.get('dayIds') as FormArray;
  
    if (event.target.checked) {
      // Add the selected day ID to FormArray
      dayIdsArray.push(new FormControl(dayId));
    } else {
      // Remove the unselected day ID from FormArray
      const index = dayIdsArray.controls.findIndex(control => control.value === dayId);
      if (index !== -1) {
        dayIdsArray.removeAt(index);
      }
    }
  
    console.log("Selected Days:", this.doctorAvailabilityForm.value.dayIds);
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
  AddEdit(){
    this.loading = true;
    let model = Object.assign({}, this.doctorAvailabilityForm.getRawValue());
    
    if (this.data.id)
      model.Id = this.data.id
    this.doctorAvailabilityService.addEditDoctorAvaibality(model).subscribe((data: any) => {
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

  //Its Close The DialogRef Modal
  closeClick() {
    this.dialogref.close();
  }
  isDaySelected(dayId: number): boolean {
    const dayIdsArray = this.doctorAvailabilityForm.get('dayIds') as FormArray;
    return dayIdsArray.value.includes(dayId);  // ✅ Check if `dayId` exists in FormArray
  }
  
  
}
