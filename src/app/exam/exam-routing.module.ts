import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExamComponent } from './exam.component';
import { AssignmentsComponent } from './assignments/assignments.component';
import { GradebookComponent } from './gradebook/gradebook.component';
import { ProjectsComponent } from './projects/projects.component';
import { ExamsComponent } from './exams/exams.component';
import { ParticipationComponent } from './participation/participation.component';
import { AttendanceComponent } from './attendance/attendance.component';
import { AssignmentFormComponent } from './assignments/assignment-form/assignment-form.component';
import { AssessmentGradeViewComponent } from './gradebook/assessment-grade-view/assessment-grade-view.component';
import { ParticipationFormComponent } from './participation/participation-form/participation-form.component';
import { StudentBehaviourComponent } from './student-behaviour/student-behaviour.component';

const routes: Routes = [
  {
    path: '',
    component: ExamComponent,
    data: {
      title: 'Learning Management',
      urls: [{ title: 'Learning', url: '/learning' }, { title: 'Learning' }],
    },
    children: [
      {
        path: 'class/:classId/subject/:subjectId/assignments',
        component: AssignmentsComponent,
        data: {
          title: 'Assignments',
          urls: [
            { title: 'Learning', url: '/learning' },
            { title: 'Assignments' },
          ],
        },
      },
      {
        path: 'class/:classId/subject/:subjectId/gradebook',
        component: GradebookComponent,
        data: {
          title: 'Gradebook',
          urls: [
            { title: 'Learning', url: '/learning' },
            { title: 'Gradebook' },
          ],
        },
      },
      {
        path: 'class/:classId/subject/:subjectId/studentBehaviour',
        component: StudentBehaviourComponent,
        data: {
          title: 'studentBehaviour',
          urls: [
            { title: 'Learning', url: '/learning' },
            { title: 'studentBehaviour' },
          ],
        },
      },
      {
        path: 'class/:classId/subject/:subjectId/projects',
        component: ProjectsComponent,
        data: {
          title: 'Projects',
          urls: [
            { title: 'Learning', url: '/learning' },
            { title: 'Projects' },
          ],
        },
      },
      {
        path: 'class/:classId/subject/:subjectId/exams',
        component: ExamsComponent,
        data: {
          title: 'Exams',
          urls: [{ title: 'Learning', url: '/learning' }, { title: 'Exams' }],
        },
      },
      {
        path: 'class/:classId/subject/:subjectId/participation',
        component: ParticipationComponent,
        data: {
          title: 'Participation',
          urls: [
            { title: 'Learning', url: '/learning' },
            { title: 'Participation' },
          ],
        },
      },
      {
        path: 'class/:classId/subject/:subjectId/attendance',
        component: AttendanceComponent,
        data: {
          title: 'Attendance',
          urls: [
            { title: 'Learning', url: '/learning' },
            { title: 'Attendance' },
          ],
        },
      },
      {
        path: 'assessment/:assessmentId/type/:assessmenttype/viewassessmentgrade',
        component: AssessmentGradeViewComponent,
        data: {
          title: 'Assessment Grade View',
          urls: [
            { title: 'Learning', url: '/learning' },
            { title: 'Assessment Grade View' },
          ],
        },
      },
    ],
  },
  {
    path: 'assignment/create/:classId/:subjectId',
    component: AssignmentFormComponent,
    data: {
      title: 'Create Assignment',
      urls: [
        { title: 'Learning', url: '/learning' },
        { title: 'Create Assignment' },
      ],
    },
  },
  {
    path: 'assignment/edit/:id/:classId/:subjectId',
    component: AssignmentFormComponent,
    data: {
      title: 'Edit Assignment',
      urls: [
        { title: 'Learning', url: '/learning' },
        { title: 'Edit Assignment' },
      ],
    },
  },
  {
    path: 'participation/create/:classId/:subjectId',
    component: ParticipationFormComponent,
    data: {
      title: 'Create Participation',
      urls: [
        { title: 'Learning', url: '/learning' },
        { title: 'Create Participation' },
      ],
    },
  },
  {
    path: 'participation/edit/:period/:classId/:subjectId',
    component: ParticipationFormComponent,
    data: {
      title: 'Edit Participation',
      urls: [
        { title: 'Learning', url: '/learning' },
        { title: 'Edit Participation' },
      ],
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LearningManagementRoutingModule {}
