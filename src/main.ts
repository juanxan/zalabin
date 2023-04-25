import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { routes } from './app/app-routing.module'
import { provideAnimations, BrowserAnimationsModule } from '@angular/platform-browser/animations'

import { MainComponent } from './app/modules/main/main.component';
import { importProvidersFrom, inject } from '@angular/core';
import {  provideHttpClient, withInterceptors } from '@angular/common/http';
import { TokenInterceptor } from './app/infraestructure/interceptors/token.interceptor';

bootstrapApplication(MainComponent, {
  providers: [
    provideAnimations(),
    provideRouter(routes),
    importProvidersFrom(BrowserAnimationsModule),
    provideHttpClient(
      withInterceptors([TokenInterceptor]),
    )
]
})
  .catch(err => console.error(err));
