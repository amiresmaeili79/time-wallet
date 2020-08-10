import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {SignupComponent} from "./signup/signup.component";
import {LogoutComponent} from "./logout/logout.component";


const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    data: {
      title: 'Login | Work Wallet',
      description: 'Login to your account'
    }
  },
  {
    path: 'signup',
    component: SignupComponent,
    data: {
      title: 'Sign up | Work Wallet',
      description: 'Create a new account'
    }
  },
  { path: 'logout', component: LogoutComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
