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
           allowedRoles: [ ROLES.SuperAdmin,ROLES.Admin,ROLES.Rerecptionist,ROLES.Doctor],
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
            ROLES.Doctor,
            ROLES.Rerecptionist
          ],
        },
        canActivate: [AuthGuard,RoleGuard],
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
          allowedRoles: [ROLES.SuperAdmin, ROLES.Admin,ROLES.Doctor],
         
        },
        canActivate: [AuthGuard,RoleGuard],
      },
      {
        path: 'medicine',
        loadChildren: () =>
            import('./medicine-management/medicine-management.module').then(
                (_) => _.MedicineManagementModule
              ),
        data: {
          title: 'Medicine',
          urls: [{ title: 'Medicine', url: '/medicine' }, { title: 'Medicine' }],
          allowedRoles: [ROLES.SuperAdmin, ROLES.Admin,ROLES.Doctor],
         
        },
        canActivate: [AuthGuard,RoleGuard],
      },
      {
        path: 'patientAppointment',
        loadChildren: () =>
            import('./patient-appointment/patient-appointment.module').then(
                (_) => _.PatientAppointmentModule
              ),
        data: {
          title: 'PatientAppointment',
          urls: [{ title: 'PatientAppointment', url: '/patientAppointment' }, { title: 'PatientAppointment' }],
          allowedRoles: [ROLES.SuperAdmin, ROLES.Doctor,ROLES.Rerecptionist],
         
        },
        canActivate: [AuthGuard,RoleGuard],
      },
      {
        path: 'doctorAvailability',
        loadChildren: () =>
            import('./doctor-availability/doctor-availability.module').then(
                (_) => _.DoctorAvailabilityModule
              ),
        data: {
          title: 'DoctorAvailability',
          urls: [{ title: 'DoctorAvailability'}, { title: 'DoctorAvailability' }],
          allowedRoles: [ROLES.SuperAdmin,ROLES.Admin, ROLES.Doctor],
         
        },
        canActivate: [AuthGuard,RoleGuard],
      },
      {
        path: 'PatientHistory',
        loadChildren: () =>
            import('./patient-checkup-description/patient-checkup-description.module').then(
                (_) => _.PatientCheckupDescriptionModule
              ),
        data: {
          title: 'PatientCheckupDescription',
          urls: [{ title: 'PatientCheckupDescription'}, { title: 'PatientCheckupDescription' }],
          allowedRoles: [ROLES.SuperAdmin,ROLES.Admin, ROLES.Doctor],
         
        },
        canActivate: [AuthGuard,RoleGuard],
      },
      {
        path: 'doctorHoliDay',
        loadChildren: () =>
            import('./doctor-holiday-management/doctor-holiday-management.module').then(
                (_) => _.DoctorHolidayManagementModule
              ),
        data: {
          title: 'DoctorHoliDay',
          urls: [{ title: 'DoctorHoliDay'}, { title: 'doctorHoliDay' }],
          allowedRoles: [ROLES.SuperAdmin,ROLES.Admin, ROLES.Doctor],
         
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
