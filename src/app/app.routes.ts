import { Routes } from '@angular/router';
import { BlankComponent } from './layouts/blank/blank.component';
import { FullComponent } from './layouts/full/full.component';
import { AuthGuard } from './auth/auth.guard';
import { ROLES } from './shared/models/ROLES';
import { RoleGuard } from './auth/RoleGuard';

export const routes: Routes = [
  {
    path: '',
    component: FullComponent,
    children: [
      {
        path: '',
        redirectTo: '/starter',
        pathMatch: 'full',
      },
      {
        path: 'vendor',
        loadChildren: () =>
          import('./vendor/vendor.module').then((_) => _.VendorModule),
        data: {
          title: 'Vendor',
          urls: [{ title: 'Vendor', url: '/vendor' }, { title: 'Vendor' }],
          allowedRoles: [ROLES.SuperAdmin, ROLES.Admin],
        },
        canActivate: [AuthGuard],
      },
      {
        path: 'starter',
        loadChildren: () =>
          import('./pages/pages.routes').then((m) => m.PagesRoutes),
        data: {
          title: 'Starter',
          urls: [{ title: 'Starter', url: '/starter' }, { title: 'Starter' }],
          // allowedRoles: [
          //   ROLES.SuperAdmin,
          //   ROLES.Admin,
          //   ROLES.Teacher,
          //   ROLES.Student,
          //   ROLES.Driver,
          //   ROLES.Finance,
          //   ROLES.Supervisor,
          // ],
        },
        //canActivate: [AuthGuard],
      },
      {
        path: 'billing',
        loadChildren: () =>
          import('./billing/billing.module').then((_) => _.BillingModule),
        data: {
          title: 'Finance Management',
          urls: [
            { title: 'Finance Management', url: '/billing' },
            { title: 'Finance' },
          ],
          allowedRoles: [ROLES.SuperAdmin, ROLES.Admin, ROLES.Finance],
        },
        canActivate: [AuthGuard],
      },
      {
        path: 'classroom',
        loadChildren: () =>
          import('./classroom/classroom.module').then((_) => _.ClassroomModule),
        data: {
          title: 'Classroom',
          urls: [
            { title: 'Classroom', url: '/classroom' },
            { title: 'Classroom' },
          ],
          allowedRoles: [ROLES.SuperAdmin, ROLES.Admin, ROLES.Teacher],
        },
        canActivate: [AuthGuard],
      },
      {
        path: 'employee',
        loadChildren: () =>
          import('./employee/employee.module').then((_) => _.EmployeeModule),
        data: {
          title: 'Employee',
          urls: [
            { title: 'Employee', url: '/employee' },
            { title: 'Employee' },
          ],
          allowedRoles: [ROLES.SuperAdmin, ROLES.Admin],
        },
        canActivate: [AuthGuard],
      },
      {
        path: 'learning',
        loadChildren: () =>
          import('./exam/exam.module').then((_) => _.LearningManagementModule),
        data: {
          title: 'Learning Management',
          urls: [
            { title: 'Learning', url: '/learning' },
            { title: 'Learning' },
          ],
          allowedRoles: [ROLES.SuperAdmin, ROLES.Admin, ROLES.Teacher],
        },
        canActivate: [AuthGuard],
      },
      {
        path: 'parent',
        loadChildren: () =>
          import('./parent/parent.module').then((_) => _.ParentModule),
        data: {
          title: 'Parent',
          urls: [{ title: 'Parent', url: '/parent' }, { title: 'Parent' }],
          allowedRoles: [ROLES.SuperAdmin, ROLES.Admin, 'PARENT'],
        },
        canActivate: [AuthGuard],
      },
      {
        path: 'route',
        loadChildren: () =>
          import('./route/route.module').then((_) => _.RouteModule),
        data: {
          title: 'Route',
          urls: [{ title: 'Route', url: '/route' }, { title: 'Route' }],
          allowedRoles: [ROLES.SuperAdmin, ROLES.Admin, ROLES.Driver],
        },
        canActivate: [AuthGuard],
      },
      {
        path: 'Settings',
        loadChildren: () =>
          import('./security/security.module').then((_) => _.SecurityModule),
        data: {
          title: 'Settings',
          urls: [
            { title: 'Settings', url: '/Settings' },
            { title: 'Settings' },
          ],
          allowedRoles: [ROLES.SuperAdmin, ROLES.Admin],
        },
        canActivate: [AuthGuard],
      },

      {
        path: 'student',
        loadChildren: () =>
          import('./student/student.module').then((_) => _.StudentModule),
        data: {
          title: 'Student',
          urls: [{ title: ROLES.Student, url: '/student' }, { title: ROLES.Student }],
          allowedRoles: [ROLES.SuperAdmin, ROLES.Admin, ROLES.Student],
        },
        canActivate: [AuthGuard],
      },
      {
        path: 'AppSetting',
        loadChildren: () =>
          import('./app-setting/app-setting.module').then(
            (_) => _.AppSettingModule
          ),
        data: {
          title: 'App Setting',
          urls: [
            { title: 'App Setting', url: '/AppSetting' },
            { title: 'App Setting' },
          ],
          allowedRoles: [ROLES.SuperAdmin, ROLES.Admin],
        },
        canActivate: [AuthGuard],
      },
      {
        path: 'Profile',
        loadChildren: () =>
          import('./Profile/profile-setting.module').then(
            (_) => _.ProfileSettingModule
          ),
        data: {
          title: 'Profile',
          urls: [{ title: 'Profile', url: '/Profile' }, { title: 'Profile' }],
          allowedRoles: [
            ROLES.SuperAdmin,
            ROLES.Admin,
            ROLES.Teacher,
            ROLES.Student,
            ROLES.Driver,
            ROLES.Finance,
            ROLES.Supervisor
          ],
        },
        canActivate: [AuthGuard],
      },
      {
        path: 'user',
        loadChildren: () =>
          import('././user-management/user-management.module').then(
            (_) => _.UserManagementModule
          ),
        data: {
          title: 'User',
          urls: [{ title: 'User', url: '/user' }, { title: 'User' }],
          allowedRoles: [
            ROLES.SuperAdmin, ROLES.Admin, ROLES.StudentParent],
        },
        canActivate: [AuthGuard,RoleGuard],
      },
    ],
  },
  {
    path: '',
    component: BlankComponent,
    children: [
      {
        path: 'authentication',
        loadChildren: () =>
          import('./pages/authentication/authentication.routes').then(
            (m) => m.AuthenticationRoutes
          ),
        data: {
          title: 'Authentication',
          urls: [
            { title: 'Authentication', url: '/authentication' },
            { title: 'Authentication' },
          ],
        },
      },
    ],
  },
  {
    path: '**',
    redirectTo: 'authentication/error',
  },
];
