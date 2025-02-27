import { Routes } from '@angular/router';
import { StarterComponent } from './starter/starter.component';
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
