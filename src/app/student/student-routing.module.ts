import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentComponent } from './student.component';
import { StudentsComponent } from './components/students-list/students.component';
import { DetailComponentComponent } from './components/detail/detail-component/detail-component.component';
import { StudentCreateComponent } from './components/Create/student-create/student-create.component';
import {StudentProfileComponent} from './components/detail/student-profile/student-profile.component';
const studentRoutes: Routes = [
  {
    path: '',
    component: StudentComponent,
    children: [
      {
        path: '',
        component: StudentsComponent,
      },
      {
        path: 'create',
        component: StudentCreateComponent,
        data: {
          title: 'Student',
          urls: [
            { title: 'Dashboard', url: '/student' },
            { title: 'Student' },
          ],
        },
      },
      // {
      //   path: 'view/:id',
      //   component: DetailComponentComponent,
      //   data: {
      //     title: 'Student',
      //     urls: [
      //       { title: 'Dashboard', url: '/student' },
      //       { title: 'Student' },
      //     ],
      //   },
      // },
      {
        path: 'view/:id',
        component: StudentProfileComponent,
        data: {
          title: 'Student',
          urls: [
            { title: 'Dashboard', url: '/student' },
            { title: 'Student' },
          ],
        },
      },
      {
        path: 'edit/:id',
        component: StudentCreateComponent,
        data: {
          title: 'Student',
          urls: [
            { title: 'Dashboard', url: '/student' },
            { title: 'Student' },
          ],
        },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(studentRoutes)],
  exports: [RouterModule],
})
export class StudentRoutingModule {}
