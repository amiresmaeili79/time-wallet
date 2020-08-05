import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TrackerComponent } from './Tasks/tracker.component';
import {ProjectsComponent} from "./projects/projects.component";

const routes: Routes = [
  { path: '', component: TrackerComponent },
  { path: 'projects', component: ProjectsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TrackerRoutingModule { }
