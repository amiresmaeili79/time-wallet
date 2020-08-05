import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TrackerRoutingModule } from './tracker-routing.module';
import { TrackerComponent } from './Tasks/tracker.component';
import {MatExpansionModule} from "@angular/material/expansion";
import {MatIconModule} from "@angular/material/icon";
import {MatFormFieldModule} from "@angular/material/form-field";
import {ReactiveFormsModule} from "@angular/forms";
import {MatSelectModule} from "@angular/material/select";
import {MatInputModule} from "@angular/material/input";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatNativeDateModule} from "@angular/material/core";
import {NgxMaterialTimepickerModule} from "ngx-material-timepicker";
import {MatButtonModule} from "@angular/material/button";
import {TrackerService} from "./service/tracker.service";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import { TaskComponent } from './Tasks/task/task.component';
import {MatCardModule} from "@angular/material/card";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {MatTooltipModule} from "@angular/material/tooltip";
import {TokenInterceptor} from "../services/token.interceptor";
import {ProjectsComponent} from "./projects/projects.component";


@NgModule({
  declarations: [
    TrackerComponent,
    TaskComponent,
    ProjectsComponent
  ],
  imports: [
    CommonModule,
    TrackerRoutingModule,
    MatExpansionModule,
    MatIconModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    NgxMaterialTimepickerModule,
    MatButtonModule,
    HttpClientModule,
    MatCardModule,
    MatSnackBarModule,
    MatTooltipModule,
  ],
  providers: [
    TrackerService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ]
})
export class TrackerModule { }
