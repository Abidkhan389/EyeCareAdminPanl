import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DoctorHolidaysListComponent } from './Components/doctor-holidays-list/doctor-holidays-list.component';
import { doctorHolidayManagementComponents } from './doctorHolidayManagement.components';

const DoctorHolidaysManagementRoutes: Routes = [
  {
    path: '',
    component: doctorHolidayManagementComponents,
    children: [
      {
        path: '',
        component: DoctorHolidaysListComponent,
      },
    ],
  },
];


@NgModule({
  imports: [RouterModule.forChild(DoctorHolidaysManagementRoutes)],
  exports: [RouterModule]
})
export class DoctorHolidayManagementRoutingModule { }
