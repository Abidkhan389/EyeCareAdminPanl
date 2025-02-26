import { MaterialModule } from './../material/material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExamComponent } from './exam.component';
import { SharedModule } from '../shared/shared.module';
import { LearningManagementComponent } from './learning-management/learning-management.component';
import { AttendanceCalendarComponent } from './attendance-calendar/attendance-calendar.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatListModule } from '@angular/material/list';
import { AssignmentsComponent } from './assignments/assignments.component';
import { ProjectsComponent } from './projects/projects.component';
import { GradebookComponent } from './gradebook/gradebook.component';
import { ParticipationComponent } from './participation/participation.component';
import { ExamsComponent } from './exams/exams.component';
import { AssignmentFormComponent } from './assignments/assignment-form/assignment-form.component';
import { AssignmentViewComponent } from './assignments/assignment-view/assignment-view.component';
import { ExamFormComponent } from './exams/exam-form/exam-form.component';
import { ExamViewComponent } from './exams/exam-view/exam-view.component';
import { ProjectFormComponent } from './projects/projects-form/projects-form.component';
import { ProjectViewComponent } from './projects/projects-view/projects-view.component';
import { MatIconModule } from '@angular/material/icon';
import { AssessmentGradeViewComponent } from './gradebook/assessment-grade-view/assessment-grade-view.component';
import { ParticipationFormComponent } from './participation/participation-form/participation-form.component';
import { AttendanceComponent } from './attendance/attendance.component';
import { LearningManagementRoutingModule } from './exam-routing.module';
import { TranslateModule } from '@ngx-translate/core';
import { AddEditStudentBehaviourComponent } from './student-behaviour/add-edit-student-behaviour/add-edit-student-behaviour.component';
import { StudentBehaviourComponent } from './student-behaviour/student-behaviour.component';
import { StudentBehaviourViewComponent } from './student-behaviour/student-behaviour-view/student-behaviour-view.component';

@NgModule({
  declarations: [
    ExamComponent,
    LearningManagementComponent,
    AttendanceCalendarComponent,
    AssignmentsComponent,
    ProjectsComponent,
    GradebookComponent,
    ParticipationComponent,
    ExamsComponent,
    AssignmentFormComponent,
    AssignmentViewComponent,
    ExamFormComponent,
    ExamViewComponent,
    ProjectFormComponent,
    ProjectViewComponent,
    AssessmentGradeViewComponent,
    ParticipationFormComponent,
    AttendanceComponent,
    StudentBehaviourComponent,
    AddEditStudentBehaviourComponent,
    StudentBehaviourViewComponent
  ],
  imports: [
    CommonModule,
    LearningManagementRoutingModule,
    MaterialModule,
    SharedModule,
    MatExpansionModule,
    MatListModule,
    MatIconModule,
    TranslateModule,
  ],
})
export class LearningManagementModule {}
