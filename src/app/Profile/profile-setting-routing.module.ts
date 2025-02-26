import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileSettingComponent } from './Components/profile-setting/profile-setting.component';
const ProfileSettingRoutes: Routes = [
  {
    path: '',
    component: ProfileSettingComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(ProfileSettingRoutes)],
  exports: [RouterModule],
})
export class ProfileSettingRoutingModule {}
