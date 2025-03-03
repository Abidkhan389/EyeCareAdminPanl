import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { patientAppointmentManagementComponent } from './patientAppointmentManagement.component';
import { PatientAppointmentListComponent } from './Components/patient-appointment-list/patient-appointment-list.component';
import { ViewPatientAppointmentComponent } from './Components/view-patient-appointment/view-patient-appointment.component';



const patientAppointmentRoutes: Routes = [
  {
    path: '',
    component: patientAppointmentManagementComponent,
    children: [
      {
        path: '',
        component: PatientAppointmentListComponent,
      },
      {
        path: 'view/:id',
        component: ViewPatientAppointmentComponent,
        data: {
          title: 'MedicineType',
          urls: [
            { title: 'Dashboard', url: '/medicineType' },
            { title: 'MedicineType' },
          ],
        },
      },
    ],
  },
];


@NgModule({
  imports: [RouterModule.forChild(patientAppointmentRoutes)],
  exports: [RouterModule]
})
export class PatientAppointmentRoutingModule { }
