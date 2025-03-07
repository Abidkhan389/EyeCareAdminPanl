import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { userManagementComponent } from './userManagement.component';
import { UserListComponent } from './Components/user-list/user-list.component';
import { ViewUserComponent } from './Components/view-user/view-user.component';
const UserManagementRoutes: Routes = [
  {
    path: '',
    component: userManagementComponent,
    children: [
      {
        path: '',
        component: UserListComponent,
      },
      
      {
        path: 'view/:id',
        component: ViewUserComponent,
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
