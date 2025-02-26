import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserManagementListComponent } from './Components/user-management-list/user-management-list.component';
import { UsermanagementFormComponent } from './Components/usermanagement-form/usermanagement-form.component';
import { UserManagementViewComponent } from './Components/user-management-view/user-management-view.component';
import { userManagementComponent } from './userManagement.component';
const UserManagementRoutes: Routes = [
  {
    path: '',
    component: userManagementComponent,
    children: [
      {
        path: '',
        component: UserManagementListComponent,
      },
      {
        path: 'create',
        component: UsermanagementFormComponent,
        data: {
          title: 'User',
          urls: [
            { title: 'Dashboard', url: '/user' },
            { title: 'User' },
          ],
        },
      },
      
      {
        path: 'view/:id',
        component: UserManagementViewComponent,
        data: {
          title: 'User',
          urls: [
            { title: 'Dashboard', url: '/user' },
            { title: 'User' },
          ],
        },
      },
      {
        path: 'edit/:id',
        component: UsermanagementFormComponent,
        data: {
          title: 'User',
          urls: [
            { title: 'Dashboard', url: '/user' },
            { title: 'User' },
          ],
        },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(UserManagementRoutes)],
  exports: [RouterModule],
})
export class UserManagementRoutingModule {}
