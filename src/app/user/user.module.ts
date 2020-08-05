import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import {SharedModule} from "../shared/shared.module";
import {ReactiveFormsModule} from "@angular/forms";
import {Route, RouterModule} from "@angular/router";
import { SignupComponent } from './signup/signup.component';
import {UserRoutingModule} from "./user-routing.module";
import { LogoutComponent } from './logout/logout.component';

@NgModule({
  declarations: [
    LoginComponent,
    SignupComponent,
    LogoutComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    UserRoutingModule
  ],
  exports: [
    LoginComponent
  ]
})
export class UserModule { }
