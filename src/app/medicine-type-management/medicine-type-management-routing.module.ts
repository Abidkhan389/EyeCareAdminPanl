import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { medicineTypeManagementComponent } from './medicineTypeManagement.component';
import { MedicineTypeListComponent } from './Components/medicine-type-list/medicine-type-list.component';
import { ViewMedicineTypeComponent } from './Components/view-medicine-type/view-medicine-type.component';

const MedicineTypeManagementRoutes: Routes = [
  {
    path: '',
    component: medicineTypeManagementComponent,
    children: [
      {
        path: '',
        component: MedicineTypeListComponent,
      },
      {
        path: 'view/:id',
        component: ViewMedicineTypeComponent,
        data: {
          //title: 'MedicineType',
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
  imports: [RouterModule.forChild(MedicineTypeManagementRoutes)],
  exports: [RouterModule]
})
export class MedicineTypeManagementRoutingModule { }
