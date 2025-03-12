import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PatientCheckupDescriptionRoutingModule } from './patient-checkup-description-routing.module';
import { MaterialModule } from '../material.module';
import { SharedModule } from '../shared/shared.module';
import { PatientcheckupdescriptinComponent } from './patientcheckupdescriptin.component';


@NgModule({
  declarations: [PatientcheckupdescriptinComponent],
  imports: [
    CommonModule,
    MaterialModule,
    SharedModule,
    PatientCheckupDescriptionRoutingModule
  ]
})
export class PatientCheckupDescriptionModule { }
