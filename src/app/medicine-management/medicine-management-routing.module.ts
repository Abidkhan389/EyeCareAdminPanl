import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MedicineListComponent } from './Components/medicine-list/medicine-list.component';
import { medicineManagementComponent } from './medicineManagement.component';

const MedicineTypeManagementRoutes: Routes = [
  {
    path: '',
    component: medicineManagementComponent,
    children: [
      {
        path: '',
        component: MedicineListComponent,
      },
      // {
      //   path: 'view/:id',
      //   component: ViewMedicineTypeComponent,
      //   data: {
      //     title: 'MedicineType',
      //     urls: [
      //       { title: 'Dashboard', url: '/medicineType' },
      //       { title: 'MedicineType' },
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
