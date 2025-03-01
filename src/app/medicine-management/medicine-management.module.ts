import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MedicineManagementRoutingModule } from './medicine-management-routing.module';
import { MaterialModule } from '../material.module';
import { SharedModule } from '../shared/shared.module';
import { medicineManagementComponent } from './medicineManagement.component';



@NgModule({
  declarations: [medicineManagementComponent],
  imports: [
     CommonModule,
     MaterialModule,
     SharedModule,
    MedicineManagementRoutingModule
  ]
})
export class MedicineManagementModule { }
