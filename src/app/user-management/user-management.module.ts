import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsermanagementFormComponent } from './Components/usermanagement-form/usermanagement-form.component';
import { TranslateModule } from '@ngx-translate/core';
import { MaterialModule } from '../material.module';
import { SharedModule } from '../shared/shared.module';
import { UserManagementListComponent } from './Components/user-management-list/user-management-list.component';
import { UserManagementViewComponent } from './Components/user-management-view/user-management-view.component';
import { UserManagementRoutingModule } from './userManagement-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { TablerIconsModule } from 'angular-tabler-icons';
import { userManagementComponent } from './userManagement.component';



@NgModule({
  declarations: [
    UserManagementListComponent,
    UsermanagementFormComponent,
    UserManagementViewComponent,
    userManagementComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    SharedModule,
    TranslateModule,
    UserManagementRoutingModule,
    ReactiveFormsModule,
    TablerIconsModule
  ]
})
export class UserManagementModule { }
