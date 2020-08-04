import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import {SharedModule} from "../shared/shared.module";
import {ReactiveFormsModule} from "@angular/forms";
import {Route, RouterModule} from "@angular/router";


const routes: Route[] = [
  {path: '', component: LoginComponent}
]


@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ]
})
export class UserModule { }
