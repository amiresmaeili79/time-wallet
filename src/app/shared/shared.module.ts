import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {UserService} from "../services/user.service";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {TokenInterceptor} from "../services/token.interceptor";



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule
  ],
  exports:[
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  providers: [
    UserService,
  ]
})
export class SharedModule { }
