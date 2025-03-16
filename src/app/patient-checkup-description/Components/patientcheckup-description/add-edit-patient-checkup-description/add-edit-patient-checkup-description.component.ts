import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';
import { Helpers } from 'src/app/_common/_helper/app_helper';
import { Eyes, EyeDistance } from 'src/app/_common/_helper/enum';
import { ResultMessages } from 'src/app/_common/constant';
import { showErrorMessage, showSuccessMessage } from 'src/app/_common/messages';
import { MaterialModule } from 'src/app/material.module';
import { MedicinesService } from 'src/app/medicine-management/Services/medicines.service';
import { PatientCheckUpDescriptionService } from 'src/app/patient-checkup-description/Services/patient-check-up-description.service';
import { SharedModule } from 'src/app/shared/shared.module';
import { Patterns } from 'src/app/shared/Validators/patterns';
import { Messages } from 'src/app/shared/Validators/validation-messages';
import { NoWhitespaceValidator } from 'src/app/shared/Validators/validators';

@Component({
  selector: 'app-add-edit-patient-checkup-description',
  standalone: true,
  imports: [MaterialModule, CommonModule, SharedModule],
  templateUrl: './add-edit-patient-checkup-description.component.html',
  styleUrl: './add-edit-patient-checkup-description.component.scss'
})
export class AddEditPatientCheckupDescriptionComponent implements OnInit {
  PatientDescriptionForm: FormGroup;
  loading: boolean = false;
  validationMessages = Messages.validation_messages;
  hide = true;
  MedicineOption: any = [];
  patientDescription:any;
  medicineList: any;
  editCase:boolean=false;
  monthDays: number[] = Array.from({ length: 30 }, (_, i) => i + 1);
  constructor(public patientCheckUpDescriptionService: PatientCheckUpDescriptionService, private medicineService: MedicinesService, private fb: FormBuilder, protected router: Router, private dialogref: MatDialogRef<AddEditPatientCheckupDescriptionComponent>,
    private dilog: MatDialog, @Inject(MAT_DIALOG_DATA) public data: any) {

  }
  ngOnInit(): void {
    this.validateform();
    if (this.data.patient) {
     this.editCase=false;
      this.getDoctorMedicine(this.data.patient.doctorId)
    }
    if (this.data.prescriptionObj) {
      this.editCase=true;
      this.getDoctorMedicine(this.data.prescriptionObj.doctorId)
      this.GetPatiencheckupDescription(this.data.prescriptionObj.prescriptionId, (data: { [x: string]: any; doctorTimeSlots?: any; dayIds?: any }) => {
        if (data) {
          this.PatientDescriptionForm.patchValue(data);
    
          this.MedicineOption = this.PatientDescriptionForm.get('medicine') as FormArray;
    
          // Clear existing medicine form array
          this.MedicineOption.clear();
    
          // Add new medicine form controls from backend data
          if (data['medicine'] && data['medicine'].length > 0) {
            data['medicine'].forEach((item: any) => {
              const medicineForm = this.createMedicineForm(); // create empty control
              this.MedicineOption.push(medicineForm); // push it to form array
              medicineForm.patchValue(item); // patch values individually
            });
          }
        }
      });
    }
    
  }
  getDoctorMedicine(doctorId: any) {
    this.loading = true;
    let model = Object.assign({});
    model.doctorId = doctorId
    this.medicineService.getAllDoctorMedicine(model).pipe(
      finalize(() => {
        this.loading = false;
      }))
      .subscribe(result => {
        if (result) {
          this.medicineList = result.data;
        }
      },
        error => {
          showErrorMessage(ResultMessages.serverError);
        });
  }
  validateform() {
    this.PatientDescriptionForm = this.fb.group({
      complaintOf: ['', Validators.compose([NoWhitespaceValidator, Validators.pattern(Patterns.titleRegex), Validators.maxLength(1000), Validators.minLength(5)])],
      diagnosis: ['', Validators.compose([NoWhitespaceValidator, Validators.pattern(Patterns.titleRegex), Validators.maxLength(1000), Validators.minLength(5)])],
      plan: ['', Validators.compose([NoWhitespaceValidator, Validators.pattern(Patterns.titleRegex), Validators.maxLength(1000), Validators.minLength(5)])],
      medicine: this.fb.array([]),
      leftVision: [null, Validators.compose([NoWhitespaceValidator, Validators.pattern(Patterns.PatientEyeRegex),])],
      rightVision: [null, Validators.compose([NoWhitespaceValidator, Validators.pattern(Patterns.PatientEyeRegex),])],
      leftMG: [null, Validators.compose([NoWhitespaceValidator, Validators.pattern(Patterns.PatientEyeRegex),])],
      rightMG: [null, Validators.compose([NoWhitespaceValidator, Validators.pattern(Patterns.PatientEyeRegex),])],
      leftEOM: [null, Validators.compose([NoWhitespaceValidator, Validators.pattern(Patterns.PatientEyeRegex),])],
      rightEom: [null, Validators.compose([NoWhitespaceValidator, Validators.pattern(Patterns.PatientEyeRegex),])],
      leftOrtho: [null, Validators.compose([NoWhitespaceValidator, Validators.pattern(Patterns.PatientEyeRegex),])],
      rightOrtho: [null, Validators.compose([NoWhitespaceValidator, Validators.pattern(Patterns.PatientEyeRegex),])],
      leftTension: [null, Validators.compose([NoWhitespaceValidator, Validators.pattern(Patterns.PatientEyeRegex),])],
      rightTension: [null, Validators.compose([NoWhitespaceValidator, Validators.pattern(Patterns.PatientEyeRegex),])],
      leftAntSegment: [null, Validators.compose([NoWhitespaceValidator, Validators.pattern(Patterns.PatientEyeRegex),])],
      rightAntSegment: [null, Validators.compose([NoWhitespaceValidator, Validators.pattern(Patterns.PatientEyeRegex),])],
      leftDisc: [null, Validators.compose([NoWhitespaceValidator, Validators.pattern(Patterns.PatientEyeRegex),])],
      rightDisc: [null, Validators.compose([NoWhitespaceValidator, Validators.pattern(Patterns.PatientEyeRegex),])],
      leftMacula: [null, Validators.compose([NoWhitespaceValidator, Validators.pattern(Patterns.PatientEyeRegex),])],
      rightMacula: [null, Validators.compose([NoWhitespaceValidator, Validators.pattern(Patterns.PatientEyeRegex),])],
      leftPeriphery: [null, Validators.compose([NoWhitespaceValidator, Validators.pattern(Patterns.PatientEyeRegex),])],
      rightPeriphery: [null, Validators.compose([NoWhitespaceValidator, Validators.pattern(Patterns.PatientEyeRegex),])],
    });
  }
  //Add medicine with  Option
  addMedicine(val?: any, type?: any) {
    this.MedicineOption = this.PatientDescriptionForm.get('medicine') as FormArray;
    this.MedicineOption.push(this.createMedicineForm(val, type));
  }
  createMedicineForm(item?: any, type?: any) {
    return this.fb.group({
      id: [null],
      medicineId: [null, Validators.compose([Validators.required])],
      durationInDays: [null, Validators.compose([Validators.required])],
      morning: [false],
      afternoon: [false],
      evening: [false],
      night: [false],
      repeatEveryHours: [false],
      repeatEveryTwoHours: [false],
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
  GetPatiencheckupDescription(id: any, callback: any) {
    this.loading = true;
    let model = Object.assign({});
    model.id = id
    this.patientCheckUpDescriptionService.GetPatientDescriptionById(model).pipe(
      finalize(() => {
        this.loading = false;
      }))
      .subscribe(result => {
        if (result) {
          callback(result.data); 
        }
      },
        error => {
          showErrorMessage(ResultMessages.serverError);
        });

  }
  AddEdit() {

    this.loading = true;
    let model = Object.assign({}, this.PatientDescriptionForm.getRawValue());
    if(this.editCase)
    {
      model.id = this.data.prescriptionObj.prescriptionId
      model.patientId = this.data.prescriptionObj.patientId
    model.doctorId = this.data.prescriptionObj.doctorId
    }
    else{
      model.patientId = this.data.patient.patientId
      model.doctorId = this.data.patient.doctorId
    }
     
    this.patientCheckUpDescriptionService.addPatientDescription(model).subscribe((data: any) => {
      if (data.success) {
        showSuccessMessage(data.message);
        this.dialogref.close(true);
      }
      else {
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
