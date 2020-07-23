import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReporterRoutingModule } from './reporter-routing.module';
import { ReporterComponent } from './reporter.component';
import {HttpClientModule} from "@angular/common/http";
import {ReportService} from "./services/report.service";


@NgModule({
  declarations: [ReporterComponent],
  imports: [
    CommonModule,
    ReporterRoutingModule,
    HttpClientModule
  ],
  providers: [ReportService]
})
export class ReporterModule { }
