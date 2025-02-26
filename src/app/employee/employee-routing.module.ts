import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeComponent } from './employee.component';
import { EmployeeListComponent } from './components/employee-list/employee-list.component';
import { EmployeeFormComponent } from './components/employee-form/employee-form.component';
import { EmployeeViewComponent } from './components/employee-view/employee-view.component';
import {EmployeeProfileComponent} from './components/employee-profile/employee-profile.component';
const routes: Routes = [
  {
    path: '',
    component: EmployeeComponent,
    children: [
      {
        path: '',
        component: EmployeeListComponent,
      },
      {
        path: 'create',
        component: EmployeeFormComponent,
        data: {
          title: 'Employee',
          urls: [
            { title: 'Dashboard', url: '/employee' },
            { title: 'Employee' },
          ],
        },
      },
      {
        path: 'view/:id',
        component: EmployeeViewComponent,
        data: {
          title: 'Employee',
          urls: [
            { title: 'Dashboard', url: '/employee' },
            { title: 'Employee' },
          ],
        },
      },
      {
        path: 'profile/:id',
        component: EmployeeProfileComponent,
        data: {
          title: 'Employee',
          urls: [
            { title: 'Dashboard', url: '/employee' },
            { title: 'Employee' },
          ],
        },
      },
      {
        path: 'edit/:id',
        component: EmployeeFormComponent,
        data: {
          title: 'Employee',
          urls: [
            { title: 'Dashboard', url: '/employee' },
            { title: 'Employee' },
          ],
        },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EmployeeRoutingModule {}
