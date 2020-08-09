import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ReporterRoutingModule} from './reporter-routing.module';
import {ReporterComponent} from './reporter.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {ReportService} from "../services/report.service";
import {TokenInterceptor} from "../services/token.interceptor";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatTooltipModule} from "@angular/material/tooltip";
import {MatNativeDateModule} from "@angular/material/core";
import {SharedModule} from "../shared/shared.module";
import {MatRadioModule} from "@angular/material/radio";
import {MatCardModule} from "@angular/material/card";
import {MatDividerModule} from "@angular/material/divider";


@NgModule({
  declarations: [ReporterComponent],
  imports: [
    CommonModule,
    ReporterRoutingModule,
    HttpClientModule,
    MatDatepickerModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatTooltipModule,
    MatNativeDateModule,
    MatCardModule,
    SharedModule,
    MatRadioModule,
    MatDividerModule
  ],
  providers: [
    ReportService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ]
})
export class ReporterModule {
}
