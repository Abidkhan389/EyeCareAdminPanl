import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileSettingRoutingModule } from './profile-setting-routing.module';
import { ProfileSettingComponent } from './Components/profile-setting/profile-setting.component';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
    ProfileSettingComponent
  ],
  imports: [
    CommonModule,
    ProfileSettingRoutingModule,
    SharedModule
  ]
})
export class ProfileSettingModule { }
