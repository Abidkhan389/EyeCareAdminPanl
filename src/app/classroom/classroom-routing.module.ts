import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClassroomComponent } from './classroom.component';
import { CreateClassroomComponent } from './create-classroom/create-classroom.component';
import { ViewClassroomComponent } from './view-classroom/view-classroom.component';
import { ClassroomlistComponent } from './classroomlist/classroomlist.component';
import { ClassRoomManagegementComponent } from './class-room-managegement/class-room-managegement.component';
import { ClassRoomStudentManagementComponent } from './class-room-student-management/class-room-student-management.component';

const routes: Routes = [
  {
    path: '',
    component: ClassroomComponent,
    children: [
      {        
            path: '',
            component: ClassroomlistComponent,
      },
      {
        path: 'create',
      component: CreateClassroomComponent,
      data: {
        title: 'ClassRoom',
        urls: [
          { title: 'Dashboard', url: '/classroom' },
          { title: 'ClassRoom' },
        ],
      },
      },
      {
      path: 'view/:id',
      component: ViewClassroomComponent,
      data: {
        title:'ClassRoom',
        urls: [
          { title: 'Dashboard', url: '/classroom' },
          { title: 'ClassRoom' },         
        ],
      },
      },
      {
      path: 'edit/:id',
      component: CreateClassroomComponent,
      data: {
        title: 'ClassRoom',
        urls: [
          { title: 'Dashboard', url: '/classroom' },
          { title: 'ClassRoom' },
        ],
      },
      },
      {
        path: 'managesubjects/:id',
        component: ClassRoomManagegementComponent,
        data: {
          title: 'ClassRoom',
          urls: [
            { title: 'Dashboard', url: '/classroom' },
            { title: 'ClassRoom' },
          ],
        },
      },
      {
        path: 'manageStudents/:id',
        component: ClassRoomStudentManagementComponent,
        data: {
          title: 'ClassRoom',
          urls: [
            { title: 'Dashboard', url: '/classroom' },
            { title: 'ClassRoom' },
          ],
        },
      },
    ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClassroomRoutingModule {}


