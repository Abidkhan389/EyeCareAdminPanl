import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { medicineTypeManagementComponent } from './medicineTypeManagement.component';
import { MedicineTypeListComponent } from './Components/medicine-type-list/medicine-type-list.component';

const MedicineTypeManagementRoutes: Routes = [
  {
    path: '',
    component: medicineTypeManagementComponent,
    children: [
      {
        path: '',
        component: MedicineTypeListComponent,
      },
      // {
      //   path: 'create',
      //   component: UsermanagementFormComponent,
      //   data: {
      //     title: 'User',
      //     urls: [
      //       { title: 'Dashboard', url: '/user' },
      //       { title: 'User' },
      //     ],
      //   },
      // },
      
      // {
      //   path: 'view/:id',
      //   component: UserManagementViewComponent,
      //   data: {
      //     title: 'User',
      //     urls: [
      //       { title: 'Dashboard', url: '/user' },
      //       { title: 'User' },
      //     ],
      //   },
      // },
      // {
      //   path: 'edit/:id',
      //   component: UsermanagementFormComponent,
      //   data: {
      //     title: 'User',
      //     urls: [
      //       { title: 'Dashboard', url: '/user' },
      //       { title: 'User' },
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
export class MedicineTypeManagementRoutingModule { }
