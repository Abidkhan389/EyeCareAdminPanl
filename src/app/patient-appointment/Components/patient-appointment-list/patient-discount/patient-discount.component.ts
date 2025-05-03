import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { MaterialModule } from 'src/app/material.module';
import { PatientAppointmentService } from 'src/app/patient-appointment/Services/patient-appointment.service';
import { SharedModule } from 'src/app/shared/shared.module';
import { Messages } from 'src/app/shared/Validators/validation-messages';
import { showErrorMessage, showInfoMessage, showSuccessMessage } from 'src/app/_common/messages';

@Component({
  selector: 'app-patient-discount',
  standalone: true,
  imports: [MaterialModule,CommonModule,SharedModule],
  templateUrl: './patient-discount.component.html',
  styleUrl: './patient-discount.component.scss'
})
export class PatientDiscountComponent {
  PatientForm: FormGroup;
  loading:boolean= true;
  patientFullName:string;
  isEdit:boolean=false;
  validationMessages = Messages.validation_messages;
  patientCheckUpDayId: any;
  constructor(public patientAppointmentService: PatientAppointmentService,private fb: FormBuilder, protected router: Router, private dialogref: MatDialogRef<PatientDiscountComponent>,
      private dilog: MatDialog, @Inject(MAT_DIALOG_DATA) public data: any){

  }
  ngOnInit(): void {
    this.validateform();
    if(this.data.patientId)
    {
      this.isEdit=true;
    }
    this.patientFullName= this.data.firstName + '' + this.data.lastName;
    this.loading=false
  }
    validateform() {
        this.PatientForm = this.fb.group({
          discountFee : [null, Validators.required],
        });
    }
    AddEdit(){
      let model = Object.assign({}, this.PatientForm.getRawValue());

      // If patientId is in the form of a string with `{}` around it, remove them
      if (this.data.patientId) {
        // Assuming this.data.patientId is a string, clean it up
        model.patientId = this.data.patientId.replace(/[{}]/g, ""); // Removes curly braces
        model.doctorId = this.data.doctorId;
      }
          this.patientAppointmentService.addEditPatientDiscount(model).subscribe((data: any) => {
            debugger;
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
   //Its Close The DialogRef Modal
   closeClick() {
    this.dialogref.close();
  }

}

