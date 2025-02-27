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
        path: 'starter',
        loadChildren: () =>
          import('./pages/pages.routes').then((m) => m.PagesRoutes),
        data: {
          title: 'Starter',
          urls: [{ title: 'Starter', url: '/starter' }, { title: 'Starter' }],
           allowedRoles: [
             ROLES.SuperAdmin,
             ROLES.Admin,
             ROLES.Rerecptionist
          ],
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
          allowedRoles: [ROLES.SuperAdmin, ROLES.Admin],
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
          allowedRoles: [ROLES.SuperAdmin, ROLES.Admin],
         
        },
        canActivate: [AuthGuard,RoleGuard],
      },
      {
        path: 'medicineType',
        loadChildren: () =>
            import('./medicine-type-management/medicine-type-management.module').then(
                (_) => _.MedicineTypeManagementModule
              ),
        data: {
          title: 'MedicineType',
          urls: [{ title: 'MedicineType', url: '/medicineType' }, { title: 'MedicineType' }],
          allowedRoles: [ROLES.SuperAdmin, ROLES.Admin],
         
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
