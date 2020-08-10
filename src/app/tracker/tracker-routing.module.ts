import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TrackerComponent } from './Tasks/tracker.component';
import {ProjectsComponent} from "./projects/projects.component";

const routes: Routes = [
  {
    path: '',
    component: TrackerComponent,
    data: {
      title: 'Time Tracker | Work Wallet',
      description: 'Track your work hours and manage your time'
    }
  },
  {
    path: 'projects',
    component: ProjectsComponent,
    data: {
      title: 'Projects | Work Wallet',
      description: 'Manage your projects'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TrackerRoutingModule { }
