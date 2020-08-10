import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReporterComponent } from './reporter.component';

const routes: Routes = [
  {
    path: '',
    component: ReporterComponent,
    data: {
      title: 'Dashboard | Work Wallet',
      description: 'See your summary of work'
    }
  }
  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReporterRoutingModule { }
