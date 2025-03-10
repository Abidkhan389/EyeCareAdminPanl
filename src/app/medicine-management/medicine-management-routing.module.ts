import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MedicineListComponent } from './Components/medicine-list/medicine-list.component';
import { medicineManagementComponent } from './medicineManagement.component';
import { ViewMedicineComponent } from './Components/view-medicine/view-medicine.component';
import { MedicineDoctorManagementComponent } from './Components/medicine-list/medicine-doctor-management/medicine-doctor-management.component';

const MedicineTypeManagementRoutes: Routes = [
  {
    path: '',
    component: medicineManagementComponent,
    children: [
      {
        path: '',
        component: MedicineListComponent,
      },
      {
        path: 'view/:id',
        component: ViewMedicineComponent,
        data: {
          title: 'Medicine',
          urls: [
            { title: 'Dashboard', url: '/medicine' },
            { title: 'Medicine' },
          ],
        },
      },
      // {
      //   path: 'manageDoctor/:id',
      //   component: MedicineDoctorManagementComponent,
      //   data: {
      //     title: 'Doctor-Medicine Assignment',
      //     urls: [
      //       { title: 'Dashboard', url: '/medicine' },
      //       { title: 'medicine' },
      //     ],
      //   },
      // },
    ],
  },
];


@NgModule({
  imports: [RouterModule.forChild(MedicineTypeManagementRoutes)],
  exports: [RouterModule]
})
export class MedicineManagementRoutingModule { }
