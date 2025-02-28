import { Component, inject, Inject } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Messages } from 'src/app/shared/Validators/validation-messages';
import { MedicinetypeService } from '../../Services/medicinetype.service';
import { Patterns } from 'src/app/shared/Validators/patterns';
import { NoWhitespaceValidator } from 'src/app/shared/Validators/validators';
import { MatChipInputEvent } from '@angular/material/chips';
import { finalize } from 'rxjs';
import { showErrorMessage } from 'src/app/_common/messages';
import { ResultMessages } from 'src/app/_common/constant';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/material.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { COMMA, ENTER } from '@angular/cdk/keycodes';

@Component({
  selector: 'app-addeditmecinetype',
  standalone: true,
  imports: [MaterialModule,CommonModule,SharedModule],
  templateUrl: './addeditmecinetype.component.html',
  styleUrl: './addeditmecinetype.component.scss'
})
export class AddeditmecinetypeComponent {
  MedicineTypeForm: FormGroup;
  loading: any;
  validationMessages = Messages.validation_messages;
  hide = true;
  readonly addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  readonly announcer = inject(LiveAnnouncer);
  constructor(private medicineTypeService: MedicinetypeService, private fb: FormBuilder, protected router: Router, private dialogref: MatDialogRef<AddeditmecinetypeComponent>,
    private dilog: MatDialog, @Inject(MAT_DIALOG_DATA) public data: any) {

  }
  ngOnInit(): void {
    this.validateform();
    if (this.data.MedicineTypeId) {
      this.GetMedicineType()
    }
  }
  validateform() {
    this.MedicineTypeForm= this.fb.group({
      typeName: ['', Validators.compose([NoWhitespaceValidator, Validators.required, Validators.pattern(Patterns.titleRegex), Validators.maxLength(100)])],
      medicinePotency: this.fb.array([]),
    })
  }
   // Getter for witnesses FormArray
   get medicinePotency(): FormArray {
    return this.MedicineTypeForm.get('medicinePotency') as FormArray;
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
  GetMedicineType() {
    this.loading = true;
    let model = Object.assign({});
    model.id = this.data.MedicineTypeId;
  
    this.medicineTypeService.getMedicineTypeById(model).pipe(
      finalize(() => {
        this.loading = false; // ✅ Ensures `loading` is reset when the API call completes
      })
    )
    .subscribe(
      (result: any) => { // ✅ Explicitly define type as 'any' to avoid TS7006
        if (result) {
          this.MedicineTypeForm.patchValue({
            typeName: result.data.typeName, 
          });
          
          // Populate `medicinePotency` FormArray
          this.medicinePotency.clear(); // Clear existing form array values
          result.data.medicinePotency.forEach((potency: string) => {
            this.medicinePotency.push(new FormControl(potency, Validators.required));
          });
          
          if (this.data.IsReadOnly) {
            this.MedicineTypeForm.disable();
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
    let model = Object.assign({}, this.MedicineTypeForm.getRawValue());
    // let phn=Helpers.appendPhoneNumber(this.UserForm.get("mobileNumber").value)
    // if(phn){
    //   model.mobileNumber = phn;
    // }
    if (this.data.MedicineTypeId)
      model.medicineTypeId = this.data.MedicineTypeId
      this.medicineTypeService.addEditMedicineType(model).subscribe((data: any) => {
      this.loading = false;
      this.dialogref.close(true);
    });
  }
   //Its Close The DialogRef Modal
   closeClick() {
    this.dialogref.close();
  }

  
  
}
