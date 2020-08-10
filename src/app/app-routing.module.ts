import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {StartPageComponent} from "./start-page/start-page.component";


const routes: Routes = [
  {
    path: '',
    component: StartPageComponent,
    data: {
      title: 'Work Wallet'
    }
  },
  {
  path: 'tracker',
  loadChildren: () => import('./tracker/tracker.module').then(m => m.TrackerModule)
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./reporter/reporter.module').then(m => m.ReporterModule)
  },
  {
    path: 'auth',
    loadChildren: () => import('./user/user.module').then(m => m.UserModule)
  }
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
