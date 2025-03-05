import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DoctorAvailabilityRoutingModule } from './doctor-availability-routing.module';
import { MaterialModule } from '../material.module';
import { SharedModule } from '../shared/shared.module';
import { DoctorAvailabilityManagementComponent } from './doctor-availability-management.component';


@NgModule({
  declarations: [DoctorAvailabilityManagementComponent],
  imports: [
    CommonModule,
    MaterialModule    ,
    SharedModule,
    DoctorAvailabilityRoutingModule
  ]
})
export class DoctorAvailabilityModule { }
