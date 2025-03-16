import { LiveAnnouncer } from '@angular/cdk/a11y';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, Inject, inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';
import { ResultMessages } from 'src/app/_common/constant';
import { showErrorMessage } from 'src/app/_common/messages';
import { MedicinesService } from 'src/app/medicine-management/Services/medicines.service';
import { Patterns } from 'src/app/shared/Validators/patterns';
import { Messages } from 'src/app/shared/Validators/validation-messages';
import { NoWhitespaceValidator } from 'src/app/shared/Validators/validators';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/material.module';
import { SharedModule } from 'src/app/shared/shared.module';

@Component({
  selector: 'app-add-edit-medicine',
  standalone: true,
  imports: [MaterialModule,CommonModule,SharedModule],
  templateUrl: './add-edit-medicine.component.html',
  styleUrl: './add-edit-medicine.component.scss'
})
export class AddEditMedicineComponent implements OnInit{
  MedicinesForm: FormGroup;
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
  constructor(private medicineService: MedicinesService, private fb: FormBuilder, protected router: Router, private dialogref: MatDialogRef<AddEditMedicineComponent>,
    private dilog: MatDialog, @Inject(MAT_DIALOG_DATA) public data: any) {

  }
  ngOnInit(): void {
    this.validateform();
    if (this.data.MedicineId) {
      this.GetMedicineById()
    }
    //this.GetAllDoctors();
    this.GetAllMedicineTypeList();
    this.MedicinesForm.get('medicineTypeId')?.valueChanges.subscribe((id) => {
      if (id) {
        this.fetchPotency(id);
      }
    });
  }
  validateform() {
    this.MedicinesForm= this.fb.group({
      medicineName: ['', Validators.compose([NoWhitespaceValidator, Validators.required, Validators.pattern(Patterns.titleRegex), Validators.maxLength(200)])],
      expiryDate: [new Date(), Validators.required],
      medicineTypeId : [null, Validators.required],
      medicineTypePotencyId : [null, Validators.required]
    })
  }
   // Getter for witnesses FormArray
   get medicinePotency(): FormArray {
    return this.MedicinesForm.get('medicinePotency') as FormArray;
  }
  addmedicinePotency(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    if (value) {
      this.medicinePotency.push(this.fb.control(value));
    }
    // Clear the input
    if (event.input) {
      event.input.value = '';
    }
  }

  removemedicinePotency(index: number): void {
    this.medicinePotency.removeAt(index);
  }

  editmedicinePotency(index: number, event: any): void {
    const value = (event.value || '').trim();
    if (value) {
      this.medicinePotency.at(index).setValue(value);
    }
  }
  GetMedicineById() {
    this.loading = true;
    let model = Object.assign({});
    model.id = this.data.MedicineId;
  
    this.medicineService.getMedicineById(model).pipe(
      finalize(() => {
        this.loading = false; // ✅ Ensures `loading` is reset when the API call completes
      })
    )
    .subscribe(
      (result: any) => { // ✅ Explicitly define type as 'any' to avoid TS7006
        if (result) {
          this.MedicinesForm.patchValue({
            medicineTypeId: result.data.medicineTypeId, 
            medicineName : result.data.medicineName,
            medicineTypePotencyId : result.data.medicineTypePotencyId,
            expiryDate:result.data.expiryDate

          });
          
          if (this.data.IsReadOnly) {
            this.MedicinesForm.disable();
          }
        }
      },
      (error: any) => { // ✅ Explicitly define type as 'any' to avoid TS7006
        showErrorMessage(ResultMessages.serverError);
      }
    );
  }
  AddEdit(){
    this.loading = true;
    // this.addEdituser = this.userForm.value;
    let model = Object.assign({}, this.MedicinesForm.getRawValue());
    // let phn=Helpers.appendPhoneNumber(this.UserForm.get("mobileNumber").value)
    // if(phn){
    //   model.mobileNumber = phn;
    // }
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
        }
      },
        error => {
          showErrorMessage(ResultMessages.serverError);
        });
  }
  GetAllMedicineTypeList()
  {
    this.loading = true;
    this.medicineService.getAllMedicineTypes().pipe(
      finalize(() => {
        this.loading = false;
      }))
      .subscribe(result => {
        if (result) {
          this.medicineTypesList = result.data;
        }
      },
        error => {
          showErrorMessage(ResultMessages.serverError);
        });
  }
   // Fetch potency from backend
   fetchPotency(medicineTypeId: any) {
    this.medicineService.getPotencyListByType(medicineTypeId).pipe(
      finalize(() => {
        this.loading = false;
      }))
      .subscribe(result => {
        if (result) {
          this.medicinePotencyList = result.data;
        }
      },
        error => {
          showErrorMessage(ResultMessages.serverError);
        });
  }
}
