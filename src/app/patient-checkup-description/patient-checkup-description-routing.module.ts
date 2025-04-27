import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PatientcheckupdescriptinComponent } from './patientcheckupdescriptin.component';
import { ViewpatientcheckupDescriptionComponent } from './Components/viewpatientcheckup-description/viewpatientcheckup-description.component';
import { PatientcheckupDescriptionComponent } from './Components/patientcheckup-description/patientcheckup-description.component';

const patientcheckupDescriptionRoutes: Routes = [
   {
    path: '',
    component: PatientcheckupdescriptinComponent,
    children: [
      {
        path: '',
        component: PatientcheckupDescriptionComponent,
      },
      {
        path: 'view/:id',
        component: ViewpatientcheckupDescriptionComponent,
        data: {
          title: 'PatientHistory',
          urls: [
            { title: 'Dashboard', url: '/PatientHistory' },
            { title: 'PatientCheckupDescription' },
          ],
        },
      },
    ],
   },
];


@NgModule({
  imports: [RouterModule.forChild(patientcheckupDescriptionRoutes)],
  exports: [RouterModule]
})
export class PatientCheckupDescriptionRoutingModule { }
