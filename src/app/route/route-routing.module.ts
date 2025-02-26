import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RouteComponent } from './route.component';
import { BusRouteListComponent } from './Components/bus-route-list/bus-route-list.component';
import { BusRouteFormComponent } from './Components/bus-route-form/bus-route-form.component';
import { BusRouteViewComponent } from './Components/bus-route-view/bus-route-view.component';

const routes: Routes = [
  {
    path: '',
    component: RouteComponent,
    children: [
      {
        path: '',
        component: BusRouteListComponent,
      },
      {
        path: 'create',
        component: BusRouteFormComponent,
        data: {
          title: 'Route',
          urls: [
            { title: 'Dashboard', url: '/route' },
            { title: 'Route' },
          ],
        },
      },
      {
        path: 'view/:id',
        component: BusRouteViewComponent,
        data: {
          title: 'Route',
          urls: [
            { title: 'Dashboard', url: '/route' },
            { title: 'Route' },
          ],
        },
      },
      {
        path: 'edit/:id',
        component: BusRouteFormComponent,
        data: {
          title: 'Route',
          urls: [
            { title: 'Dashboard', url: '/route' },
            { title: 'Route' },
          ],
        },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RouteRoutingModule {}
