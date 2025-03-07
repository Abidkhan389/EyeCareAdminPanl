import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DoctorAvailabilityManagementComponent } from './doctor-availability-management.component';
import { ViewDoctorAvailabilityComponent } from './Components/view-doctor-availability/view-doctor-availability.component';
import { DoctorAvailabilityListComponent } from './Components/doctor-availability-list/doctor-availability-list.component';

const doctorAvailabilityRoutes: Routes = [
  {
    path: '',
    component: DoctorAvailabilityManagementComponent,
    children: [
      {
        path: '',
        component: DoctorAvailabilityListComponent,
      },
      {
        path: 'view/:id',
        component: ViewDoctorAvailabilityComponent,
        data: {
          title: 'DoctorAvailability',
          urls: [
            { title: 'Dashboard', url: '/doctorAvailability' },
            { title: 'DoctorAvailability' },
          ],
        },
      },
    ],
  },
];


@NgModule({
  imports: [RouterModule.forChild(doctorAvailabilityRoutes)],
  exports: [RouterModule]
})
export class DoctorAvailabilityRoutingModule { }
