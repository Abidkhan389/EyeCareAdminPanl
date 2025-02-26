import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouteRoutingModule } from './route-routing.module';
import { RouteComponent } from './route.component';
import { MaterialModule } from '../material/material.module';
import { SharedModule } from '../shared/shared.module';
import { BusRouteListComponent } from './Components/bus-route-list/bus-route-list.component';
import { BusRouteViewComponent } from './Components/bus-route-view/bus-route-view.component';
import { BusRouteFormComponent } from './Components/bus-route-form/bus-route-form.component';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    RouteComponent,
    BusRouteListComponent,
    BusRouteViewComponent,
    BusRouteFormComponent,
  ],
  imports: [
    CommonModule,
    RouteRoutingModule,
    MaterialModule,
    SharedModule,
    TranslateModule,
  ],
})
export class RouteModule {}
