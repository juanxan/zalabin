import { Injectable } from '@angular/core';
import { HttpClient,HttpContext } from '@angular/common/http';
import { NO_TOKEN } from '../interceptors/token.interceptor';
import { IpAdress } from '../common/interfaces/userip.interface';
@Injectable({
  providedIn: 'root'
})
export class UserIpService {

  constructor(private http: HttpClient) { }

  getIPAddress() {
    return this.http.get<IpAdress>('https://geolocation-db.com/json/', {context: new HttpContext().set(NO_TOKEN, true)});
  }
}
