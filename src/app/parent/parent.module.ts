import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ParentRoutingModule } from './parent-routing.module';
import { ParentComponent } from './parent.component';
import { MaterialModule } from '../material/material.module';
import { SharedModule } from '../shared/shared.module';
import { TranslateModule } from '@ngx-translate/core';
import { StudentDashboardComponent } from './student-dashboard/student-dashboard.component';
import { CourseHomeComponent } from './course-home/course-home.component';
import { StudentAssignmentsComponent } from './components/student-assignments/student-assignments.component';
import { StudentBehaviorComponent } from './components/student-behavior/student-behavior.component';
import { StudentExamsComponent } from './components/student-exams/student-exams.component';
import { StudentParticipationComponent } from './components/student-participation/student-participation.component';
import { StudentAttendanceComponent } from './components/student-attendance/student-attendance.component';
import { MatInputModule } from '@angular/material/input';
import { MaterialFileInputModule } from 'ngx-material-file-input';
import { StudentProjectsComponent } from './components/student-projects/student-projects.component';
import { StudentTakeExamComponent } from './components/student-exams/student-take-exam/student-take-exam.component';
import { FormsModule } from '@angular/forms';
import { MatRadioModule } from '@angular/material/radio';
import { StudentGradesViewComponent } from './components/student-grades-view/student-grades-view.component';

@NgModule({
  declarations: [
    ParentComponent,
    StudentDashboardComponent,
    CourseHomeComponent,
    StudentAssignmentsComponent,
    StudentProjectsComponent,
    StudentBehaviorComponent,
    StudentExamsComponent,
    StudentParticipationComponent,
    StudentAttendanceComponent,
    StudentTakeExamComponent,
    StudentGradesViewComponent
  ],
  imports: [
    CommonModule,
    ParentRoutingModule,
    MaterialModule,
    SharedModule,
    TranslateModule,
    MatInputModule,
    MaterialFileInputModule,
    FormsModule,
    MatRadioModule,
  ],
})
export class ParentModule {}
