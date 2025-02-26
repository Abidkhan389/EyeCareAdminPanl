import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: 'dashboard',
        loadChildren: () =>
          import('../dashboard/dashboard.module').then(
            (_) => _.DashboardModule
          ),
      },
      {
        path: 'billing',
        loadChildren: () =>
          import('../billing/billing.module').then((_) => _.BillingModule),
      },
      {
        path: 'classroom',
        loadChildren: () =>
          import('../classroom/classroom.module').then(
            (_) => _.ClassroomModule
          ),
      },
      {
        path: 'employee',
        loadChildren: () =>
          import('../employee/employee.module').then((_) => _.EmployeeModule),
      },
      {
        path: 'main/exam',
        loadChildren: () =>
          import('../../app/exam/exam-routing.module').then(
            (_) => _.LearningManagementRoutingModule
          ),
      },
      {
        path: 'parent',
        loadChildren: () =>
          import('../parent/parent.module').then((_) => _.ParentModule),
      },
      {
        path: 'route',
        loadChildren: () =>
          import('../route/route.module').then((_) => _.RouteModule),
      },
      {
        path: 'Settings',
        loadChildren: () =>
          import('../security/security.module').then((_) => _.SecurityModule),
      },
      {
        path: 'student',
        loadChildren: () =>
          import('../student/student.module').then((_) => _.StudentModule),
      },
      {
        path: 'vendor',
        loadChildren: () =>
          import('../vendor/vendor.module').then((_) => _.VendorModule),
      },
      {
        path: 'AppSetting',
        loadChildren: () =>
          import('../app-setting/app-setting.module').then(
            (_) => _.AppSettingModule
          ),
      },
      {
        path: 'Profile',
        loadChildren: () =>
          import('../Profile/profile-setting.module').then(
            (_) => _.ProfileSettingModule
          ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainRoutingModule {}
