import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PatientAppointmentRoutingModule } from './patient-appointment-routing.module';
import { MaterialModule } from '../material.module';
import { SharedModule } from '../shared/shared.module';
import { patientAppointmentManagementComponent } from './patientAppointmentManagement.component';



@NgModule({
  declarations: [patientAppointmentManagementComponent],
  imports: [
    CommonModule,
    MaterialModule,
    SharedModule,
    PatientAppointmentRoutingModule
  ]
})
export class PatientAppointmentModule { }
