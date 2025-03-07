import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { MaterialModule } from '../material.module';
import { SharedModule } from '../shared/shared.module';
import { UserManagementRoutingModule } from './userManagement-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { TablerIconsModule } from 'angular-tabler-icons';
import { userManagementComponent } from './userManagement.component';



@NgModule({
  declarations: [
    userManagementComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    SharedModule,
    UserManagementRoutingModule,
    TablerIconsModule
  ]
})
export class UserManagementModule { }
