import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';


const routes: Routes = [{
  path: 'tracker',
  loadChildren: () => import('./tracker/tracker.module').then(m => m.TrackerModule)
}, {path: 'report', loadChildren: () => import('./reporter/reporter.module').then(m => m.ReporterModule)}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
