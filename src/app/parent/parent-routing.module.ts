import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ParentComponent } from './parent.component';
import { StudentDashboardComponent } from './student-dashboard/student-dashboard.component';
import { CourseHomeComponent } from './course-home/course-home.component';
import { StudentGradesViewComponent } from './components/student-grades-view/student-grades-view.component';

const routes: Routes = [
  {
    path: '',
    component: ParentComponent,
  },
  {
    path: 'studentdashboard/:studentId',
    component: StudentDashboardComponent,
    data: {
      title: 'Student Dashboard',
      urls: [
        { title: 'Parent Dashboard', url: '/parent' },
        { title: 'Student Dashboard' },
      ],
      allowedRoles: ['SUPERADMIN', 'ADMIN', 'STUDENTPARENT'],
    },
  },
  {
    path: 'coursehome/:studentId',
      component: CourseHomeComponent,
      data: {
      title: 'Student Dashboard',
      urls: [
      { title: 'StudentDashboard', url: '/parent' },
      { title: 'Parent' },
      ],
      allowedRoles: ['SUPERADMIN', 'ADMIN', 'STUDENTPARENT'],
    },
  },
  {
    path: 'coursehome/:studentId/:classroomId/:subjectId',
    component: CourseHomeComponent,
    data: {
      title: 'Student Dashboard',
      urls: [
        { title: 'Parent Dashboard', url: '/parent' },
        { title: 'Student Dashboard' },
      ],
      allowedRoles: ['SUPERADMIN', 'ADMIN', 'STUDENTPARENT'],
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ParentRoutingModule {}
