import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Helpers } from 'src/app/_common/_helper/app_helper';
import { Eyes, EyeDistance } from 'src/app/_common/_helper/enum';
import { showErrorMessage, showSuccessMessage } from 'src/app/_common/messages';
import { MaterialModule } from 'src/app/material.module';
import { PatientCheckUpDescriptionService } from 'src/app/patient-checkup-description/Services/patient-check-up-description.service';
import { SharedModule } from 'src/app/shared/shared.module';
import { Patterns } from 'src/app/shared/Validators/patterns';
import { Messages } from 'src/app/shared/Validators/validation-messages';
import { NoWhitespaceValidator } from 'src/app/shared/Validators/validators';

@Component({
  selector: 'app-add-edit-patient-checkup-description',
  standalone: true,
  imports: [MaterialModule,CommonModule,SharedModule],
  templateUrl: './add-edit-patient-checkup-description.component.html',
  styleUrl: './add-edit-patient-checkup-description.component.scss'
})
export class AddEditPatientCheckupDescriptionComponent implements OnInit {
  PatientDescriptionForm: FormGroup;
  loading:boolean=false;
  validationMessages = Messages.validation_messages;
    hide = true;
    MedicineOption: any = [];
    monthDays: number[] = Array.from({ length: 30 }, (_, i) => i + 1);
    constructor(public patientCheckUpDescriptionService: PatientCheckUpDescriptionService, private fb: FormBuilder, protected router: Router, private dialogref: MatDialogRef<AddEditPatientCheckupDescriptionComponent>,
      private dilog: MatDialog, @Inject(MAT_DIALOG_DATA) public data: any) {
       
    }
    ngOnInit(): void {
      this.validateform();
      if (this.data.patient) {
        this.GetPatiencheckupDescription()
        this.getDoctorMedicine(this.data.doctorId)
      }
    }
    getDoctorMedicine(doctorId:any){

    }
    validateform() {
        this.PatientDescriptionForm= this.fb.group({
          description: ['', Validators.compose([NoWhitespaceValidator, Validators.required, Validators.pattern(Patterns.titleRegex), Validators.maxLength(1000), Validators.minLength(5)])],
          complaintOf: ['', Validators.compose([NoWhitespaceValidator, Validators.required, Validators.pattern(Patterns.titleRegex), Validators.maxLength(1000), Validators.minLength(5)])],
          diagnosis: ['', Validators.compose([NoWhitespaceValidator, Validators.required, Validators.pattern(Patterns.titleRegex), Validators.maxLength(1000), Validators.minLength(5)])],
          plan: ['', Validators.compose([NoWhitespaceValidator, Validators.required, Validators.pattern(Patterns.titleRegex), Validators.maxLength(1000), Validators.minLength(5)])],
          medicine: this.fb.array([]),
          leftEyevisoin: [null, Validators.compose([NoWhitespaceValidator, Validators.required, Validators.pattern(Patterns.titleRegex),])],
          righttEyevisoin: [null, Validators.compose([NoWhitespaceValidator, Validators.required, Validators.pattern(Patterns.titleRegex),])],
          leftEyemg: [null, Validators.compose([NoWhitespaceValidator, Validators.required, Validators.pattern(Patterns.titleRegex),])],
          rightEyemg: [null, Validators.compose([NoWhitespaceValidator, Validators.required, Validators.pattern(Patterns.titleRegex),])],
          leftEyeEom: [null, Validators.compose([NoWhitespaceValidator, Validators.required, Validators.pattern(Patterns.titleRegex),])],
          rightEyeEom: [null, Validators.compose([NoWhitespaceValidator, Validators.required, Validators.pattern(Patterns.titleRegex),])],
          leftEyeOrtho: [null, Validators.compose([NoWhitespaceValidator, Validators.required, Validators.pattern(Patterns.titleRegex),])],
          rightEyeOrtho: [null, Validators.compose([NoWhitespaceValidator, Validators.required, Validators.pattern(Patterns.titleRegex),])],
          leftEyeTension: [null, Validators.compose([NoWhitespaceValidator, Validators.required, Validators.pattern(Patterns.titleRegex),])],
          rightEyeTension: [null, Validators.compose([NoWhitespaceValidator, Validators.required, Validators.pattern(Patterns.titleRegex),])],
          leftEyeEntSegment: [null, Validators.compose([NoWhitespaceValidator, Validators.required, Validators.pattern(Patterns.titleRegex),])],
          rightEyeEntSegment: [null, Validators.compose([NoWhitespaceValidator, Validators.required, Validators.pattern(Patterns.titleRegex),])],
          leftEyeDisc: [null, Validators.compose([NoWhitespaceValidator, Validators.required, Validators.pattern(Patterns.titleRegex),])],
          rightEyeDisc: [null, Validators.compose([NoWhitespaceValidator, Validators.required, Validators.pattern(Patterns.titleRegex),])],
          leftEyeMacula: [null, Validators.compose([NoWhitespaceValidator, Validators.required, Validators.pattern(Patterns.titleRegex),])],
          rightEyeMacula: [null, Validators.compose([NoWhitespaceValidator, Validators.required, Validators.pattern(Patterns.titleRegex),])],
        });
      }
      //Add medicine with  Option
  addMedicine(val?:any, type?:any) {
    this.MedicineOption = this.PatientDescriptionForm.get('medicine') as FormArray;
    this.MedicineOption.push(this.createMedicineForm(val, type));
  }
  createMedicineForm(item?:any, type?:any) {
    return this.fb.group({
      medicineId: [null, Validators.compose([Validators.required])],
      durationInDays : [null, Validators.compose([Validators.required])],
      morning: [false],
      afternoon : [false],
      evening: [false],
      night: [false],
      repeatEveryHours : [false],
      repeatEveryTwoHours  : [false],
    });
  }
   // Remove medicine at a specific index
   removeMedicine(index: number) {
    this.getMedicineArray().removeAt(index);
  }
  // Get the medicine FormArray
  getMedicineArray(): FormArray {
    return this.PatientDescriptionForm.get('medicine') as FormArray;
  }
      GetPatiencheckupDescription(){

      }
   AddEdit(){
       
       this.loading = true;
       let model = Object.assign({}, this.PatientDescriptionForm.getRawValue());
      if (this.data.id)
           model.Id = this.data.id
         this.patientCheckUpDescriptionService.addPatientDescription(model).subscribe((data: any) => {
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
}
