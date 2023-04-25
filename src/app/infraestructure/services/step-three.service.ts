import { Injectable, inject } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient,HttpContext, HttpParams } from '@angular/common/http';
import { Municipality } from '../common/interfaces/parametric.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StepThreeService {
  
  private readonly urlDataApi = environment.dataApi.url;
  private http = inject(HttpClient);

  constructor() {
    //
   }

  getMunicipalityApi(Municipality: any){
    const url = '/v1/geozone/'
    const params = new HttpParams().set('city_name_like', Municipality);
    return this.http.get(url,{params});
  }

}
