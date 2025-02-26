import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';
import { SharedModule } from '../shared/shared.module';
import { AppSettingFormComponent } from './Components/app-setting-form/app-setting-form.component';
import { AppSettingListComponent } from './Components/app-setting-list/app-setting-list.component';
import { AppSettingRoutingModule } from './app-setting-routing.module';
import { AppSettingComponent } from './app-setting.component';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    AppSettingComponent,
    AppSettingFormComponent,
    AppSettingListComponent,
  ],
  imports: [
    CommonModule,
    AppSettingRoutingModule,
    MaterialModule,
    SharedModule,
    TranslateModule,
  ],
})
export class AppSettingModule {}
