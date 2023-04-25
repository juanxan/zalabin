import { Injectable, inject } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { TokenAgenteMotor } from '../common/interfaces/login.interface';

import { CookieService } from 'ngx-cookie-service';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  
  private urlAgente = environment.content.url;
  private http = inject(HttpClient);
  constructor(
    private cookieService: CookieService
  ) { }

  login(){
    const url = '/api/CDSCustomer/Login';
    return this.http.get<TokenAgenteMotor>(url).pipe(
      map((resp)=>{
        this.setToken(resp.access_token);
        return resp;
      })
    );
  }

  setToken(token: string){
    const expirationDate = new Date();
    expirationDate.setMinutes(expirationDate.getMinutes() + 1);
    // this.cookieService.set('token', token, expirationDate);
    localStorage.setItem('token',token);
  }

  getToken(){
    return localStorage.getItem('token');
  }
}
