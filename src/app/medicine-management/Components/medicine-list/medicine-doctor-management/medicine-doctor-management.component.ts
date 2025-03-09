import { LiveAnnouncer } from '@angular/cdk/a11y';
import { ENTER, COMMA } from '@angular/cdk/keycodes';
import { CommonModule } from '@angular/common';
import { Component, inject, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';
import { ResultMessages } from 'src/app/_common/constant';
import { showErrorMessage } from 'src/app/_common/messages';
import { MaterialModule } from 'src/app/material.module';
import { MedicinesService } from 'src/app/medicine-management/Services/medicines.service';
import { SharedModule } from 'src/app/shared/shared.module';
import { Patterns } from 'src/app/shared/Validators/patterns';
import { Messages } from 'src/app/shared/Validators/validation-messages';
import { NoWhitespaceValidator } from 'src/app/shared/Validators/validators';
import { AddEditMedicineComponent } from '../add-edit-medicine/add-edit-medicine.component';
import { doctorList } from 'src/app/interfaces/IDoctorList';

@Component({
  selector: 'app-medicine-doctor-management',
  standalone: true,
  imports: [MaterialModule,CommonModule,SharedModule],
  templateUrl: './medicine-doctor-management.component.html',
  styleUrl: './medicine-doctor-management.component.scss'
})
export class MedicineDoctorManagementComponent implements OnInit{
  doctorIdsList: number[] = []; // Holds selected doctor IDs
  MedicinesDoctorForm: FormGroup;
  doctorControl = new FormControl([]);
  loading: any;
  validationMessages = Messages.validation_messages;
  hide = true;
  readonly addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  readonly announcer = inject(LiveAnnouncer);
  minDate: Date = new Date(); // Today's date
  maxDate: Date = new Date(new Date().setFullYear(new Date().getFullYear() + 4));
  DoctorList: any;
  medicineTypesList: any;
  medicinePotencyList: any;
  arrayDefine: boolean = false;
  MedicineDoctorManagementList: any;
  constructor(private medicineService: MedicinesService, private fb: FormBuilder, protected router: Router, private dialogref: MatDialogRef<MedicineDoctorManagementComponent>,
    private dilog: MatDialog, @Inject(MAT_DIALOG_DATA) public data: any) {

  }
  ngOnInit(): void {
    this.validateform();
    if (this.data.MedicineId) {
      //this.GetMedicineById()
    }
    this.GetAllDoctors();

  }
  validateform() {
    this.MedicinesDoctorForm= this.fb.group({
      medicineId : [null],
      doctorIds: this.fb.array([]),
    })
  }
  get doctorIds(): FormArray {
    return this.MedicinesDoctorForm.get('doctorIds') as FormArray;
  }
  addStudentPair(doctorId: number) {
    const studentGroup = this.createDoctorMedicineGroup(doctorId);
    this.doctorIds.push(studentGroup);
  }

  createDoctorMedicineGroup(doctorId?: any): FormGroup {
    return this.fb.group({
      doctorId: [doctorId, Validators.required], // Changed to 'id' for consistency
    });
  }
  removeFacultySubjectPair(index: number) {
    this.doctorIds.removeAt(index);
  }

  // Handle selection change to update studentIdsList
  onDoctorSelectionChange(event: any): void {
    // Loop through the selected student IDs
    event.value.forEach((studentId: number) => {
      // Check if the studentId is already in the studentIdsList
      if (!this.doctorIdsList.includes(studentId)) {
        // If not, add it to the list
        this.doctorIdsList.push(studentId);
      }
    });
  }

  AddEdit(){
    this.loading = true;
    // this.addEdituser = this.userForm.value;
    let model = Object.assign({}, this.MedicinesDoctorForm.getRawValue());
    // let phn=Helpers.appendPhoneNumber(this.UserForm.get("mobileNumber").value)
    // if(phn){
    //   model.mobileNumber = phn;
    // }
    debugger;
    if (this.data.MedicineId)
      model.id = this.data.MedicineId
      this.medicineService.addEditMedicines(model).subscribe((data: any) => {
      this.loading = false;
      this.dialogref.close(true);
    });
  }
   //Its Close The DialogRef Modal
   closeClick() {
    this.dialogref.close();
  }
  GetAllDoctors(){
    this.loading = true;
    this.medicineService.getAllDoctors().pipe(
      finalize(() => {
        this.loading = false;
      }))
      .subscribe(result => {
        if (result) {
          this.DoctorList = result.data;
          // if (this.MedicineDoctorManagementList.doctorIds != null) {
          //     this.MedicineDoctorManagementList.doctorIds.forEach(
          //       (pair: doctorList) => {
          //         this.doctorIds.push(
          //           this.fb.group({
          //             doctorId: new FormControl(pair.doctorId),
          //           })
          //         );
          //       }
          //     );
          //     this.MedicinesDoctorForm.patchValue(result.data);
          //   }  
        }
      },
        error => {
          showErrorMessage(ResultMessages.serverError);
        });
  }
  AddDoctos() {
    this.doctorIdsList.forEach((doctorId) => {
      const exists = this.doctorIds.controls.some(
        (control) => control.value.id === doctorId
      );
  
      if (!exists) {
        this.doctorIds.push(this.createDoctorMedicineGroup(doctorId));
      }
    });
    this.doctorIdsList = [];
    this.doctorControl.setValue([]);
    this.arrayDefine = this.doctorIds.length > 0; // Ensure rows display
  }
  
  getDoctorName(doctorId: any): string | undefined {
    return this.DoctorList.find((f: any) => f.id === doctorId)?.userName;
  }
}
