import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormBuilder, Validators,FormsModule, ReactiveFormsModule,FormControl } from '@angular/forms';

import { MatStepperModule} from '@angular/material/stepper';
import {MatSelectModule} from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from "@angular/material/form-field";
import {MatRadioModule} from '@angular/material/radio';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {ThemePalette} from '@angular/material/core';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { AdministradorService } from 'src/app/infraestructure/services/administrador.service';
import { Municipality } from 'src/app/infraestructure/common/interfaces/parametric.interface';
import { StepThreeService } from 'src/app/infraestructure/services/step-three.service';
import { Parametric } from 'src/app/modules/shared/enums/parametric.enum';
import { VehiculeComponent } from "../../vehicule/vehicule.component";
import { DTOVehicleAdd, VehiculoData } from 'src/app/infraestructure/common/interfaces/vehiculos.interface';
import { TransversalService } from 'src/app/infraestructure/services/transversal.service';

@Component({
    selector: 'app-step-three',
    templateUrl: './step-three.component.html',
    styleUrls: ['./step-three.component.scss'],
    standalone: true,
    providers: [
        AdministradorService,
        {
            provide: STEPPER_GLOBAL_OPTIONS,
            useValue: { displayDefaultIndicatorType: false },
        }
    ],
    imports: [
        MatSelectModule,
        MatIconModule,
        MatFormFieldModule,
        MatRadioModule,
        FormsModule, ReactiveFormsModule,
        MatAutocompleteModule,
        CommonModule,
        MatInputModule,
        MatStepperModule,
        VehiculeComponent
    ]
})

export class StepThreeComponent {
  @Input() thirdFormGroup = this._formBuilder.group({
    vehiclePrice: ['', Validators.required],
    placaType: ['', Validators.required],
    useType: ['', Validators.required],
    accessoriesPrice: ['', Validators.required],
    city: ['', Validators.required],
    concesionario: ['']
  });
  @Input() reference = false;
  @Input() vehicles : DTOVehicleAdd[] = [];
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

  @Output() eventToReference = new EventEmitter<boolean>();
  @Output() eventToVehicle = new EventEmitter<DTOVehicleAdd>();
  @Output() eventBackVehicle = new EventEmitter<boolean>();
  primaryControl = 'primary' as ThemePalette;
  accentControl = 'accent' as ThemePalette;
  warmControl = 'warn' as ThemePalette;
  first= false;

  myControl = new FormControl<string | Municipality>('');
  options: Municipality[] = [];
  filteredOptions: Observable<Municipality[]>;
  use_type = [
    { label: 'Particular', value: 'particular' },
    { label: 'Carga transporte mercancia propia', value: 'carga_transporte_mercancia_propia' },
    { label: 'Carga transporte mercancia terceros', value: 'carga_transporte_mercancia_terceros' },
    { label: 'Carga carroceria especial', value: 'carga_carroceria_especial' },
    { label: 'Carga transporte combustible', value: 'carga_transporte_combustible' },
    { label: 'Trailer remolque', value: 'trailer_remolque' },
    { label: 'Utilitario alquiler empresas pasajeros mercancia', value: 'utilitario_alquiler_empresas_pasajeros_mercancia' },
    { label: 'Utilitario transporte urbana mercancia propia', value: 'utilitario_transporte_urbana_mercancia_propia' },
    { label: 'Utilitario transporte urbana mercancia terceros', value: 'utilitario_transporte_urbana_mercancia_terceros' },
    { label: 'Taxi hotelero', value: 'taxi_hotelero' },
    { label: 'Taxi urbano', value: 'taxi_urbano' },
    { label: 'Transporte pasajeros escolar', value: 'transporte_pasajeros_escolar' },
    { label: 'Transporte pasajeros tripulaciones', value: 'transporte_pasajeros_tripulaciones' },
    { label: 'Transporte pasajeros urbano', value: 'transporte_pasajeros_urbano' },
    { label: 'Transporte pasajeros intermunicipal', value: 'transporte_pasajeros_intermunicipal' },
    { label: 'Transporte pasajeros interdepartamental', value: 'transporte_pasajeros_interdepartamental' }
  ];
  private readonly administradorService = inject(AdministradorService);
  private readonly stepThreeService = inject(StepThreeService);

  constructor(
    private _formBuilder: FormBuilder,
    private readonly transversalService: TransversalService
    ){
    this.getMunicipality();
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => {
        const name = typeof value === 'string' ? value : value?.description;
        return name ? this._filter(name as string) : this.options.slice();
      }),
    );
  }
  
  getMunicipality(){
    this.administradorService.getParametric(Parametric.Municipality).subscribe((data)=>{
      this.options = data;
    });
  }

  setMunicipality(event: any, type = false){
    if(type){
      this.thirdFormGroup.controls.city.setValue(event);
    }else{
      this.thirdFormGroup.controls.city.setValue(event.description);

    }
  }

  backVehicle(){
    this.eventBackVehicle.emit(true);
  }

  backVehicleReference(){
    this.first = !this.first;
  }

  nextStep(){
    console.log(this.thirdFormGroup.controls);
    
    const city = this.cleanCity(this.myControl.value);
    this.stepThreeService.getMunicipalityApi(city).subscribe((data: any)=>{
      const municipio = data.response.find((x:any)=> x.city_name === city );
      console.log(municipio);
      
      this.setMunicipality(municipio,true);
    })
  }

  cleanCity(event: any){
    const Municipio = this.transversalService.limpiarComas(String(event.description));
    return Municipio
  }

  changeToReference(){
    this.eventToReference.emit(!this.reference);
  }
  
  toFirst(event: DTOVehicleAdd){
    this.first = !this.first;
    console.log(event);
    if(event.datatwo.vehicle.vehicle_risk.commercial_price !== 0 && event.datatwo.vehicle.vehicle_risk.commercial_price !== null && 
      event.datatwo.vehicle.vehicle_risk.commercial_price !== undefined){
        this.thirdFormGroup.controls.vehiclePrice.setValue(String(event.datatwo.vehicle.vehicle_risk.commercial_price));
      }
    this.eventToVehicle.emit(event);
  }


  displayFn(municipality: Municipality): string {
    return municipality && municipality.description ? municipality.description : '';
  }

  private _filter(name: string): Municipality[] {
    const filterValue = name.toLowerCase();
    return this.options.filter(option => option.description.toLowerCase().includes(filterValue));
  }

}
