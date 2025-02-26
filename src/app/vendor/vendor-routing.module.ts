import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VendorComponent } from './vendor.component';
import { VendorViewComponent } from './components/vendor-view/vendor-view.component';
import { VendorFormComponent } from './components/vendor-form/vendor-form.component';
import { VendorListComponent } from './components/vendor-list/vendor-list.component';

const routes: Routes = [
  {
    path: '',
    component: VendorComponent,
    children: [
      {
        path: '',
        component: VendorListComponent,
        
      },
      {
        path: 'view/:id',
        component: VendorViewComponent,
        data: {
          title: 'Vendor',
          urls: [
            { title: 'Dashboard', url: '/vendor' },
            { title: 'Vendor' },
          ],
        },
      },
      {
        path: 'create',
        component: VendorFormComponent,
        data: {
          title: 'Vendor',
          urls: [
            { title: 'Dashboard', url: '/vendor' },
            { title: 'Vendor' },
          ],
        },
      },
      {
        path: 'edit/:id',
        component: VendorFormComponent,
        data: {
          title: 'Vendor',
          urls: [
            { title: 'Dashboard', url: '/vendor' },
            { title: 'Vendor' },
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
export class VendorRoutingModule {}
