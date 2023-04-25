import {  HttpInterceptorFn } from '@angular/common/http';
import { LoginService } from '../services/login.service';
import { HttpContextToken } from '@angular/common/http';
import { inject } from '@angular/core';
import { environment } from 'src/environments/environment';

export const ADMINISTRATOR_TOKEN = new HttpContextToken<boolean>(() => false);
export const NO_TOKEN = new HttpContextToken<boolean>(() => false);


export const TokenInterceptor: HttpInterceptorFn = (req, next) => {
  const tokenAdministrador = environment.administrator.token;
  const tokenLogin = inject(LoginService).getToken();
  let token = tokenLogin;
  if(req.context.get(NO_TOKEN)){
    return next(req);
  }
  if(req.context.get(ADMINISTRATOR_TOKEN)){
    token = tokenAdministrador;
  }
  const clonedRequest = req.clone({
    setHeaders:{
      Authorization: `Bearer ${token}`
    }
  });
  return next(clonedRequest);

}