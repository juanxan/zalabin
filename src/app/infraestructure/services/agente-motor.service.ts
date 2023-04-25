import { Injectable, inject } from '@angular/core';
import { HttpClient,HttpContext } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ADMINISTRATOR_TOKEN, NO_TOKEN } from '../interceptors/token.interceptor';
import { DTOVehiculosGet, Reference, DTOReference, DTOVehicle, DTOVehiculoData } from '../common/interfaces/vehiculos.interface';
import { Quotation } from '../common/interfaces/quotation.interface';
@Injectable({
  providedIn: 'root'
})
export class AgenteMotorService {

  private readonly urlAdministrator = environment.administrator.url;
  private readonly agenteMotor = environment.urlAgente.url;
  private readonly agenteMotor2 = environment.urlAgente.url;
  private http = inject(HttpClient);

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() { }

  getVehiculo(data: DTOVehiculosGet){
    // const data : DTOVehiculosGet ={
    //   placa: "PFR487",
    //   document_type: "CC",
    //   document_number: "94418907",
    //   consultas: ['fasecolda', 'es_propietario', 'identif_vehiculo']
    //  }
     console.log(data);
     
    const url = '/seguros/co/vehiculos/datos_add';
    return this.http.post(url, data);
  }

  sendQuotation(data: Quotation){
    console.log(data);
    const url = '/api/CDSCustomer/SendQuotation';
    return this.http.post(url, data);
  }
  getBrand(){
    const url = `/api/CDSCustomer/GetBrand`;
    return this.http.get<string[]>(url);
  }
  getReference(reference: Reference){
    const url = `/api/CDSCustomer/GetReference`;
    return this.http.post<string[]>(url, reference);
  }

  getVehicleByReference(reference: DTOReference){
    const url = `/api/CDSCustomer/getVehicleByReference`;
    return this.http.post<DTOVehiculoData[]>(url, reference);
  }
}
