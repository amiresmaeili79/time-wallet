import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatCardModule} from "@angular/material/card";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatListModule} from "@angular/material/list";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {SharedModule} from "./shared/shared.module";
import {TokenInterceptor} from "./shared/services/token.interceptor";
import { StartPageComponent } from './start-page/start-page.component';
import {UserModule} from "./user/user.module";
import {UserService} from "./shared/services/user.service";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {TitleService} from "./shared/services/title.service";
import {HttpErrorInterceptor} from "./shared/services/HttpErrorInterceptor";
import { LoadingPageComponent } from './loading-page/loading-page.component'
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

@NgModule({
  declarations: [
    AppComponent,
    StartPageComponent,
    LoadingPageComponent,
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        MatCardModule,
        HttpClientModule,
        MatSidenavModule,
        MatToolbarModule,
        MatListModule,
        MatButtonModule,
        MatIconModule,
        SharedModule,
        UserModule,
        MatSnackBarModule,
        MatProgressSpinnerModule
    ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorInterceptor,
      multi: true
  },
    UserService,
    TitleService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
