import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {
  DAPP_CONFIG,
  FormatAmountPipe,
  NativeAuthTokenInterceptorService,
  NgxSdkDappModule,
  ParseAmountPipe,
} from 'ngx-sdk-dapp';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardModule } from './modules/dashboard/dashboard.module';
import { HomeComponent } from './pages/home/home.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { LoginComponent } from './components/login/login.component';
import {
  NgbProgressbar,
  NgbToast,
  NgbTooltip,
} from '@ng-bootstrap/ng-bootstrap';
import { AppToastsComponent } from './components/app-toasts/app-toasts.component';
import { SDK_DAPP_CONFIG } from './config';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    AppToastsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxSdkDappModule,
    DashboardModule,
    FontAwesomeModule,
    NgbToast,
    NgbTooltip,
    NgbProgressbar,
  ],
  providers: [
    ParseAmountPipe,
    FormatAmountPipe,
    {
      provide: DAPP_CONFIG,
      useValue: SDK_DAPP_CONFIG,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: NativeAuthTokenInterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
