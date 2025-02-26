import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployeeRoutingModule } from './employee-routing.module';
import { EmployeeComponent } from './employee.component';
import { MaterialModule } from '../material/material.module';
import { SharedModule } from '../shared/shared.module';
import { EmployeeListComponent } from './components/employee-list/employee-list.component';
import { ReactiveFormsModule } from '@angular/forms';
import { EmployeeViewComponent } from './components/employee-view/employee-view.component';
import { EmployeeFormComponent } from './components/employee-form/employee-form.component';
import { TablerIconsModule } from 'angular-tabler-icons';
import { TranslateModule } from '@ngx-translate/core';
import {EmployeeProfileComponent} from '../employee/components/employee-profile/employee-profile.component';

@NgModule({
  declarations: [
    EmployeeComponent,
    EmployeeListComponent,
    EmployeeViewComponent,
    EmployeeFormComponent,
    EmployeeProfileComponent
  ],
  imports: [
    EmployeeRoutingModule,
    CommonModule,
    MaterialModule,
    SharedModule,
    ReactiveFormsModule,
    TablerIconsModule,
    TranslateModule,
  ],
})
export class EmployeeModule {}
