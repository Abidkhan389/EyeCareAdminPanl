import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClassroomRoutingModule } from './classroom-routing.module';
import { ClassroomComponent } from './classroom.component';
import { MaterialModule } from '../material/material.module';
import { SharedModule } from '../shared/shared.module';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CreateClassroomComponent } from './create-classroom/create-classroom.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { ViewClassroomComponent } from './view-classroom/view-classroom.component';
import { ClassroomlistComponent } from './classroomlist/classroomlist.component';
import { ClassRoomManagegementComponent } from './class-room-managegement/class-room-managegement.component';
import { ClassRoomStudentManagementComponent } from './class-room-student-management/class-room-student-management.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { TablerIconsModule } from 'angular-tabler-icons';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    ClassroomComponent,
    CreateClassroomComponent,
    ViewClassroomComponent,
    ClassroomlistComponent,
    ClassRoomManagegementComponent,
    ClassRoomStudentManagementComponent,
  ],
  imports: [
    CommonModule,
    ClassroomRoutingModule,
    MaterialModule,
    SharedModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    ReactiveFormsModule,
    MatCardModule,
    MatListModule,
    MatTooltipModule,
    TablerIconsModule,
    TranslateModule,
  ],
})
export class ClassroomModule {}
