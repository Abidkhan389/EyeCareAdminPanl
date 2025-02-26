import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppSettingComponent } from './app-setting.component';
import { AppSettingListComponent } from './Components/app-setting-list/app-setting-list.component';
import { AppSettingFormComponent } from './Components/app-setting-form/app-setting-form.component';

const appSettingroutes: Routes = [
  {
    path: '',
    component: AppSettingComponent,
    children: [
      {
        path: '',
        component: AppSettingListComponent,
      },
      {
        path: 'edit/:id',
        component: AppSettingFormComponent,
        data: {
          title: 'AppSetting',
          urls: [
            { title: 'Dashboard', url: '/AppSetting' },
            { title: 'AppSetting' },
          ],
        },
      },
    ],
  },
];
@NgModule({
  imports: [RouterModule.forChild(appSettingroutes)],
  exports: [RouterModule],
})
export class AppSettingRoutingModule {}