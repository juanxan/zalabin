import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DTOVehicleAdd, VehiculoData } from 'src/app/infraestructure/common/interfaces/vehiculos.interface';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

@Component({
  selector: 'app-vehicule',
  standalone: true,
  imports: [
    CommonModule,
    MatProgressSpinnerModule
  ],
  providers:[],
  templateUrl: './vehicule.component.html',
  styleUrls: ['./vehicule.component.scss']
})
export class VehiculeComponent implements OnInit {
  @Output() eventToFirst = new EventEmitter<DTOVehicleAdd>();
  @Input() vehicle : DTOVehicleAdd = {
    datatwo: {
      vehicle: {
          vehicle_risk: {
              reference_price: 0,
              commercial_price: 0
          },
          code: '',
          line: '',
          codification: {
              code: ''
          },
          weight: 0,
          model: 0,
          plate: '',
          brand: ''
      }
  },
  data: {
      vehicle: {
          plate: '',
          model: '',
          brand: '',
          engine_number: '',
          chassis_number: '',
          vin: '',
          type: '',
          line: '',
          vehicle_codification: {
              cilindraje: '',
              capacidad_pasajeros: '',
              peso: ''
          },
          bodywork_type: '',
          fuel: '',
          vehicle_risk: {
              use_type: ''
          },
          lugar_registro: {
              codigo_postal: ''
          },
          propietario: {
              mensaje: '',
              identification_type: [
                  ''
              ],
              identification_number: [
                  ''
              ],
              es_propietario: false
          }
      }
  }
  };
  first =false;
  constructor(){
    //
  }

  ngOnInit(): void {
    console.log(this.vehicle);
    
  }
  
  
  toFirst(){
    this.first = !this.first;
    this.eventToFirst.emit(this.vehicle);
  }
}
