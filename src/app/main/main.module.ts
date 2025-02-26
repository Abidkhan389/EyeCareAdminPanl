import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from './main.component';
import { SharedModule } from '../shared/shared.module';
import { MaterialModule } from '../material/material.module';
import { HeaderComponent } from './components/header/header.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppComponent } from '../app.component';

@NgModule({
  declarations: [MainComponent, HeaderComponent, NavigationComponent],
  imports: [CommonModule, MainRoutingModule, MaterialModule, SharedModule],
  providers: [
    // Register the interceptor here
  ],
})
export class MainModule {}
