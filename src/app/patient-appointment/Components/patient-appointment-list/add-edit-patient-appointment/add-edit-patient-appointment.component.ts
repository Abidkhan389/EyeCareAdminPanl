import { CommonModule } from '@angular/common';
import { Component, Inject,ElementRef,ViewChild, CUSTOM_ELEMENTS_SCHEMA  } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MaterialModule } from 'src/app/material.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { Messages } from 'src/app/shared/Validators/validation-messages';
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Helpers } from 'src/app/_common/_helper/app_helper';
import { DayOfWeek, Gendertype, MaterialType } from 'src/app/_common/_helper/enum';
import { PatientAppointmentService } from 'src/app/patient-appointment/Services/patient-appointment.service';
import { Patterns } from 'src/app/shared/Validators/patterns';
import { NoWhitespaceValidator } from 'src/app/shared/Validators/validators';
import { showErrorMessage, showInfoMessage, showSuccessMessage } from 'src/app/_common/messages';
import { ResultMessages } from 'src/app/_common/constant';
import { finalize } from 'rxjs';
import { DoctorHolidayService } from 'src/app/doctor-holiday-management/Services/doctor-holiday.service';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
// import { IDoctorHoliday } from '../../../../interfaces/IDoctorHoliday';


@Component({
  selector: 'app-add-edit-patient-appointment',
  standalone: true,
  imports: [MaterialModule,CommonModule,SharedModule],
  templateUrl: './add-edit-patient-appointment.component.html',
  styleUrl: './add-edit-patient-appointment.component.scss'
})
export class AddEditPatientAppointmentComponent {
  @ViewChild('scrollContainer', { static: false }) scrollContainer!: ElementRef;
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
  weekDays: { id: number; name: string }[] = [];
  doctorAvailibalTimeSlotsDoctorAndDayId:any;
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
   selectedDoctorId:any;
 
   doctorAvailibalTimeSlots: string[] = []; // API se fetched data aayega
   selectedSlot: string = '';
   paginatedSlots: string[] = []; // Jo slots currently show honge
   currentPage: number = 0; // Kis page par hain
   slotsPerPage: number = 8; // Kitne slots aik dafa dikhane hain
   selectedDate: string = ''; // To store selected date
   selectedTime: string = ''; // To store selected time
   patientCheckUpDayId :any;
   doctorSelected:any;
   doctorFeeList:any;
   selectedFee: number | null = null;
   doctorHolidaysDates: { from: Date; to: Date }[] = [];
  constructor(public patientAppointmentService: PatientAppointmentService,private doctorHolidayService:DoctorHolidayService ,private fb: FormBuilder, protected router: Router, private dialogref: MatDialogRef<AddEditPatientAppointmentComponent>,
    private dilog: MatDialog, @Inject(MAT_DIALOG_DATA) public data: any) {
     
    this.weekDays = Helpers.enumToArray(DayOfWeek) as { id: number; name: string }[];
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
    // const now = new Date();
    // const hours = now.getHours().toString().padStart(2, '0'); 
    // const minutes = now.getMinutes().toString().padStart(2, '0'); 
    // const currentTime = `${hours}:${minutes}`;
      this.PatientForm = this.fb.group({
        firstName: ['', Validators.compose([NoWhitespaceValidator, Validators.required, Validators.pattern(Patterns.titleRegex), Validators.maxLength(30),Validators.minLength(3)])],
        lastName: ['', Validators.compose([NoWhitespaceValidator, Validators.required, Validators.pattern(Patterns.titleRegex), Validators.maxLength(30),Validators.minLength(3)])],
        gender: [null, Validators.required],
        doctorId : [null, Validators.required],
        doctorFee : [null, Validators.required],
        age: ['', Validators.compose([NoWhitespaceValidator, Validators.required, Validators.pattern(Patterns.Num), Validators.minLength(11), Validators.maxLength(11)])],
        appoitmentDate:  ['', Validators.compose([NoWhitespaceValidator, Validators.required])],
        timeSlot:['', Validators.compose([NoWhitespaceValidator, Validators.required])],
        phoneNumber: ['', Validators.compose([NoWhitespaceValidator, Validators.required, Validators.pattern(Patterns.Num), Validators.minLength(11), Validators.maxLength(11)])],
        cnic: ['', Validators.compose([NoWhitespaceValidator, Validators.required, Validators.pattern(Patterns.CnicPattern), Validators.minLength(15), Validators.maxLength(15)])],
        city: ['', Validators.compose([NoWhitespaceValidator, Validators.required, Validators.pattern(Patterns.titleRegex), Validators.maxLength(50),Validators.minLength(3)])],
        bloodType: [null],
        maritalStatus: [null],
      });
  }
  GetPatient(){
    this.loading = true;
    let model = Object.assign({});
    model.id = this.data.patientId;
    this.patientAppointmentService.getPatientAppointmentById(model).pipe(
      finalize(() => {
        this.loading = false;
      }))
      .subscribe(result => {
        if (result) {
          this.doctorAvailibalTimeSlots = result.data.vM_DoctorTimeSlotsPerDay?.doctorSlots?.map((slot: { doctorTime: any; }) => slot.doctorTime) ?? [];

          this.doctorAvailibalTimeSlotsDoctorAndDayId = result.data.vM_DoctorTimeSlotsPerDay ?? null;
          
         
          this.updatePaginatedSlots(); 
          this.selectedDoctorId=result.data.doctorId
          this.patientCheckUpDayId= result.data.patientCheckUpDayId
          this.selectSlot(result.data?.TimeSlot) 
          this.PatientForm.patchValue(result.data);
          this.updatePaginatedSlots();
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
  onDoctorSelect(doctorId: number) {
    this.selectedDoctorId = doctorId;
    this.doctorAvailibalTimeSlots = [];
    this.paginatedSlots = [];

    // ✅ Clear the form control value if needed
    this.PatientForm.get('timeSlot')?.setValue(null); 
    // ✅ Mark form control as untouched (if necessary)
    this.PatientForm.get('timeSlot')?.markAsUntouched();

    // ✅ Fetch holidays
    this.GetSelectedDoctorHolidays(doctorId.toString());

    const selectedDoctor = this.DoctorList.find((doc: any) => doc.id === doctorId);
    this.selectedFee = selectedDoctor?.fee ? selectedDoctor.fee : 0;
    this.PatientForm.get('doctorFee')?.setValue(this.selectedFee);
        this.updatePaginatedSlots();
}

  GetSelectedDoctorHolidays(doctorId:any){
    this.loading = true;
    let model = { DoctorId: String(doctorId) }; 
    this.doctorHolidayService.getDoctorHolidayByDoctorIdForPatientAppointment(model).pipe(
      finalize(() => {
        this.loading = false;
      }))
      .subscribe(result => {
        if (result) {
          this.doctorHolidaysDates = result.data.map((h:any) => ({
            from:new Date(h.fromDate),
            to:new Date(h.toDate)
          }));
          console.log("Mapped Holidays:", this.doctorHolidaysDates);
        }
      },
        error => {
          showErrorMessage(ResultMessages.serverError);
        });
  }
  
  AddEdit(){
    
    this.loading = true;
    this.handleDateTimeSelection();
    let model = Object.assign({}, this.PatientForm.getRawValue());
    
    // let phn=Helpers.appendPhoneNumber(this.UserForm.get("mobileNumber").value)
    // if(phn){
    //   model.mobileNumber = phn;
    // }
    if (this.data.patientId){
      model.patientId = this.data.patientId
      model.patientCheckUpDayId=this.patientCheckUpDayId
    }
    else{
      model.patientCheckUpDayId=this.patientCheckUpDayId?.id
    }
      
    this.patientAppointmentService.addEditpatientAppointment(model).subscribe((data: any) => {
      if(data.success)
      {
        showSuccessMessage(data.message);
        this.dialogref.close(true);
      }
      else{
        showErrorMessage(data.message);
        this.loading = false;
      }
      
    });

  }
  handleDateTimeSelection() {
    if (!this.PatientForm) {
        console.error("PatientForm is not initialized.");
        return;
    }

    const appointmentTimeControl = this.PatientForm.get("appoitmentDate");

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
    this.PatientForm.patchValue({ appoitmentDate: isoDateTimeString });
}

  //Its Close The DialogRef Modal
  closeClick() {
    this.dialogref.close();
  }

  fetchAvailableSlots(dayId: any, date: any) {
    this.loading = true;
    let model: any = {};
    model.dayId = dayId;
    model.doctorId = this.selectedDoctorId;
    
    const userSelectedDate = new Date(date);
    userSelectedDate.setMinutes(userSelectedDate.getMinutes() - userSelectedDate.getTimezoneOffset());
    model.AppointmentDate = userSelectedDate.toISOString();
    
    this.patientAppointmentService.getDoctorAppointmentsSlotsOfDay(model).pipe(
      finalize(() => {
        this.loading = false;
      })
    ).subscribe(result => {
      if (result.success) {
        let currentTime = new Date();
        let isToday = 
          currentTime.getFullYear() === userSelectedDate.getFullYear() &&
          currentTime.getMonth() === userSelectedDate.getMonth() &&
          currentTime.getDate() === userSelectedDate.getDate();
  
        this.doctorAvailibalTimeSlots = result.data.doctorSlots.filter((slot: { doctorTime: string }) => {
          if (!isToday) return true; // If not today, return all slots
          
          let timeParts = slot.doctorTime.match(/(\d+):(\d+) (AM|PM)/);
          if (!timeParts) return false;
  
          let hours = parseInt(timeParts[1], 10);
          let minutes = parseInt(timeParts[2], 10);
          let isPM = timeParts[3] === "PM";
  
          if (isPM && hours !== 12) hours += 12;
          if (!isPM && hours === 12) hours = 0; // Convert 12 AM to 00
  
          let slotTimeInMinutes = hours * 60 + minutes;
          let currentMinutes = currentTime.getHours() * 60 + currentTime.getMinutes();
          
          return slotTimeInMinutes >= currentMinutes; // Keep only future slots
        }).map((slot: { doctorTime: string }) => slot.doctorTime);
        
        this.doctorAvailibalTimeSlotsDoctorAndDayId = result.data; 
        this.updatePaginatedSlots(); 
      } else {
        this.paginatedSlots = [];
        showInfoMessage(result.message);
      }
    },
    error => {
      showErrorMessage(ResultMessages.serverError);
    });
  }
  
  
  selectSlot(time: string) {
    this.selectedSlot = time;
    this.PatientForm.controls['timeSlot'].setValue(time);
}

updatePaginatedSlots() {
  if (this.doctorAvailibalTimeSlots.length === 0) return; // Agar empty hai to return kar dein
  const startIndex = this.currentPage * this.slotsPerPage;
  this.paginatedSlots = this.doctorAvailibalTimeSlots.slice(startIndex, startIndex + this.slotsPerPage);
}

scrollLeft() {
    if (this.currentPage > 0) {
        this.currentPage--;
        this.updatePaginatedSlots();
    }
}

scrollRight() {
    if ((this.currentPage + 1) * this.slotsPerPage < this.doctorAvailibalTimeSlots.length) {
        this.currentPage++;
        this.updatePaginatedSlots();
    }
}
formatCNIC(event: any) {
  let value = event.target.value.replace(/\D/g, ''); // Remove non-numeric characters
  if (value.length > 5) value = value.slice(0, 5) + '-' + value.slice(5);
  if (value.length > 13) value = value.slice(0, 13) + '-' + value.slice(13);
  this.PatientForm.controls['cnic'].setValue(value, { emitEvent: false });
}

// onDoctorChange(doctorId: any) {
//   if (doctorId) {
//     this.selectedDoctorId = doctorId;
//     this.patientAppointmentService.getDoctorFeeByDocotorId(doctorId).pipe(
//       finalize(() => {
//         this.loading = false;
//       }))
//       .subscribe(result => {
//         if (result.success) {
//          this.doctorSelected=true;
//          this.PatientForm.get('doctorFee')?.setValue(result.data);
//           this.updatePaginatedSlots(); 
//         } 
//         else{
//           this.paginatedSlots = [];
//           showErrorMessage(ResultMessages.noSlotsFound);
//         }
//       },
//         error => {
//           showErrorMessage(ResultMessages.serverError);
//         });
//   }
// }

onDateChange(selectedDate: any) {
  if (selectedDate) {
  
    const date = new Date(selectedDate);
    const dayName = date.toLocaleDateString('en-US', { weekday: 'long' });
    this.patientCheckUpDayId = this.weekDays.find(day => day.name.toLocaleLowerCase() === dayName.toLocaleLowerCase());

   if((this.patientCheckUpDayId?.id ?? 0) !== null && this.selectedDoctorId)
   {
    this.fetchAvailableSlots(this.patientCheckUpDayId?.id, date);
   }
    
  } 
}



}
