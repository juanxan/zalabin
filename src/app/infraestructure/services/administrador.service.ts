import { Injectable, inject } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient,HttpContext } from '@angular/common/http';
import { IParametric, Municipality } from '../common/interfaces/parametric.interface';
import { Observable, map } from 'rxjs';
import { ADMINISTRATOR_TOKEN } from '../interceptors/token.interceptor';

@Injectable({
  providedIn: 'root'
})
export class AdministradorService {

  private readonly urlAdministrator = environment.administrator.url;
  private http = inject(HttpClient);
    // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}

  getParametric(type: string): Observable<IParametric[]>{
    const url = `${this.urlAdministrator}/api/Parametric/${type}`
    return this.http.get<IParametric[]>(url, {context: new HttpContext().set(ADMINISTRATOR_TOKEN, true)}).pipe(
      map((parametrics: IParametric[]) => parametrics.filter(parametric => parametric.isActive))
      );
  }
}
