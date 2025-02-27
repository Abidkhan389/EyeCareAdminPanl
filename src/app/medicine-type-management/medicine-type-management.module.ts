import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MedicineTypeManagementRoutingModule } from './medicine-type-management-routing.module';
import { TranslateModule } from '@ngx-translate/core';
import { MaterialModule } from '../material.module';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { TablerIconsModule } from 'angular-tabler-icons';
import { medicineTypeManagementComponent } from './medicineTypeManagement.component';


@NgModule({
  declarations: [
    medicineTypeManagementComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    SharedModule,
    MedicineTypeManagementRoutingModule,
  ]
})
export class MedicineTypeManagementModule { }
