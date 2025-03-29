import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DoctorHolidayManagementRoutingModule } from './doctor-holiday-management-routing.module';
import { MaterialModule } from '../material.module';
import { SharedModule } from '../shared/shared.module';
import { doctorHolidayManagementComponents } from './doctorHolidayManagement.components';


@NgModule({
  declarations: [doctorHolidayManagementComponents],
   imports: [
      CommonModule,
      MaterialModule,
      SharedModule,
      DoctorHolidayManagementRoutingModule,
    ]
})
export class DoctorHolidayManagementModule { }
