import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReporterComponent } from './reporter.component';

const routes: Routes = [{ path: '', component: ReporterComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReporterRoutingModule { }
