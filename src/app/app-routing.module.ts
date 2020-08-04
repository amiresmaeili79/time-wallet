import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';


const routes: Routes = [
  {
  path: 'tracker',
  loadChildren: () => import('./tracker/tracker.module').then(m => m.TrackerModule)
  },
  {
    path: 'report',
    loadChildren: () => import('./reporter/reporter.module').then(m => m.ReporterModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./user/user.module').then(m => m.UserModule)
  }
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
