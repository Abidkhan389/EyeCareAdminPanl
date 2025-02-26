import { Routes } from '@angular/router';
import { StarterComponent } from './starter/starter.component';
import { LearningManagementComponent } from '../exam/learning-management/learning-management.component';
import { ProfileSettingComponent } from '../Profile/Components/profile-setting/profile-setting.component';

export const PagesRoutes: Routes = [
  {
    path: '',
    component: StarterComponent,
    data: {
      title: 'Starter',
      urls: [{ title: 'Dashboard', url: '/starter' }, { title: 'Starter' }],
    },
  },
];
