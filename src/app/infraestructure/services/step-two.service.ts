import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class StepTwoService {
  
  private urlAgente = environment.urlAgente;

  constructor(
    private readonly http: HttpClient
  ) { }



}
