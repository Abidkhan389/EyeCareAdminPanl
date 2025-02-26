import { MaterialModule } from './../material/material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudentRoutingModule } from './student-routing.module';
import { StudentComponent } from './student.component';
import { SharedModule } from '../shared/shared.module';
import { StudentsComponent } from './components/students-list/students.component';
import { StudentDetailsComponent } from './components/detail/student-details/student-details.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DetailComponentComponent } from './components/detail/detail-component/detail-component.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { AccountDetailComponent } from './components/detail/account-detail/account-detail.component';
import { ParentDetailComponent } from './components/detail/parent-detail/parent-detail.component';
import { AccountformComponent } from './components/Create/accountform/accountform.component';
import { ParentFormComponent } from './components/Create/parent-form/parent-form.component';
import { StudentCreateComponent } from './components/Create/student-create/student-create.component';
import { StudentCreateFormComponent } from './components/Create/student-create-form/student-create-form.component';
import { TranslateModule } from '@ngx-translate/core';
import{StudentProfileComponent} from './components/detail/student-profile/student-profile.component';
@NgModule({
  declarations: [
    StudentComponent,
    StudentsComponent,
    StudentDetailsComponent,
    DetailComponentComponent,
    AccountDetailComponent,
    ParentDetailComponent,
    AccountformComponent,
    ParentFormComponent,
    StudentCreateComponent,
    StudentCreateFormComponent,
    StudentProfileComponent
  ],
  imports: [
    CommonModule,
    StudentRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    MatGridListModule,
    TranslateModule,
  ],
})
export class StudentModule {}
