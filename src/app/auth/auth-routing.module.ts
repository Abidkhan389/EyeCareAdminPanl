import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { RegisterComponent } from './components/register/register.component';

/**
 * @constant {Routes} routes
 * @description An array defining the routing configuration for the authentication module.
 * It includes a route for the sign-in component with a default path.
 */
const routes: Routes = [
  {
    path: '',
    component: SignInComponent,
  },
  {
    path: 'signUp',
    component: RegisterComponent,
  },
];

/**
 * @class AuthRoutingModule
 * @description A module that provides routing configuration for the authentication features.
 * It imports the RouterModule with the child routes defined for the authentication module.
 * It also exports the RouterModule so that other modules can use the routing configuration.
 */
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
