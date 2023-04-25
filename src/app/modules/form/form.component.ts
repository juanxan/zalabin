import { Component, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { CommonModule,DatePipe } from '@angular/common';
import { FormControl, FormBuilder, Validators,FormsModule, ReactiveFormsModule, PatternValidator } from '@angular/forms';
import { UserIpService } from 'src/app/infraestructure/services/user-ip.service';

import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';

import {MatNativeDateModule} from '@angular/material/core';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatRadioModule} from '@angular/material/radio';
import {ThemePalette} from '@angular/material/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { MatGridListModule } from '@angular/material/grid-list';
import {MatSelectModule} from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatStepper, MatStepperModule} from '@angular/material/stepper';
import { MatInputModule } from '@angular/material/input';
import { AseguradoraTableComponent } from '../shared/components/aseguradora/aseguradora-table/aseguradora-table.component';
import { StepOneComponent } from '../shared/components/steps/step-one/step-one.component';
import { StepTwoComponent } from '../shared/components/steps/step-two/step-two.component';
import { StepThreeComponent } from '../shared/components/steps/step-three/step-three.component';
import { StepFourComponent } from '../shared/components/steps/step-four/step-four.component';
import { AgenteMotorService } from 'src/app/infraestructure/services/agente-motor.service';
import { DTOReference, DTOVehicle, DTOVehicleAdd, DTOVehiculoData, DTOVehiculosGet, VehiculoData } from 'src/app/infraestructure/common/interfaces/vehiculos.interface';
import { Quotation } from 'src/app/infraestructure/common/interfaces/quotation.interface';
import { TransversalService } from 'src/app/infraestructure/services/transversal.service';

import Swal from 'sweetalert2'

export interface User {
  name: string;
}
@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
  standalone: true,
  imports:[
    MatIconModule,
    MatNativeDateModule,
    MatStepperModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatGridListModule,
    MatAutocompleteModule,
    CommonModule,
    MatRadioModule,
    MatDatepickerModule,
    AseguradoraTableComponent,
    StepOneComponent,
    StepTwoComponent,
    StepThreeComponent,
    StepFourComponent
  ],
  providers:[
    UserIpService,
    TransversalService,
    DatePipe,
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: {displayDefaultIndicatorType: false},
    }
  ]
})
export class FormComponent implements OnInit {
  @ViewChild('stepper') stepper!: MatStepper;
  finish= false;
  cotiza= false;
  references = false;
  urlCliente :any;
  primaryControl = 'primary' as ThemePalette;
  accentControl = 'accent' as ThemePalette;
  warmControl = 'warn' as ThemePalette;
  myControl = new FormControl<string | User>('');
  options: User[] = [{name: 'Mary'}, {name: 'Shelley'}, {name: 'Igor'}];
  filteredOptions: Observable<User[]>;
  userIp='';
  vehicles: DTOVehicleAdd[] = [];
  vehicle: DTOVehicleAdd = {
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

  firstFormGroup = this._formBuilder.group({
    // eslint-disable-next-line no-useless-escape
    placa: ['',[Validators.pattern('^[a-zA-Z]{3}[0-9]{2}[a-zA-Z0-9]{0,1}$')]],
    brand: [''],
    model: [''],
    reference: ['']
  });
  secondFormGroup = this._formBuilder.group({
    identificationType: [''],
    identification: [''],
  });
  thirdFormGroup = this._formBuilder.group({
    vehiclePrice: ['', Validators.required],
    placaType: ['', Validators.required],
    useType: ['', Validators.required],
    accessoriesPrice: ['', Validators.required],
    city: ['', Validators.required],
    concesionario: ['']
  });
  fourFormGroup = this._formBuilder.group({
    name: ['', Validators.required],
    familyname:['', Validators.required],
    genres:['', Validators.required],
    typeDocument:['', Validators.required],
    document:['', Validators.required],
    birthdayDate:['', Validators.required],
    Occupation:['', Validators.required],
    tel:['', [
      Validators.required,
        Validators.minLength(10),
        Validators.maxLength(10),
        Validators.pattern('^[0-9]{10}$')]
    ],
    // eslint-disable-next-line no-useless-escape
    email:['', [Validators.required, Validators.pattern('[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*@[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*[.][a-zA-Z]{2,5}')]],
    check: [false, [Validators.requiredTrue]]
  });
  isLinear = true;

  constructor(
    private _formBuilder: FormBuilder,
    private readonly userIpService: UserIpService,
    private readonly agenteService: AgenteMotorService,
    private readonly transversalService: TransversalService,
    private readonly sanitizer: DomSanitizer
    ) {
    this.filteredOptions = this.myControl.valueChanges.pipe(
        startWith(''),
        map(value => {
          const name = typeof value === 'string' ? value : value?.name;
          return name ? this._filter(name as string) : this.options.slice();
        }),
      );
    }
  ngOnInit(): void {
    this.getIpAddress();
  }
  
  getIpAddress(){
    this.userIpService.getIPAddress().subscribe({
      next: (data)=>{
         this.userIp =  data.IPv4;
      },
      error: (err)=>{
        console.log(err);
      }
    })
  }

  backVehicle(){
    this.firstFormGroup.reset();
    this.secondFormGroup.reset();
    this.stepper.selectedIndex = 0;
  }

  displayFn(user: User): string {
    return user && user.name ? user.name : '';
  }

  private _filter(name: string): User[] {
    const filterValue = name.toLowerCase();

    return this.options.filter(option => option.name.toLowerCase().includes(filterValue));
  }

  toFinish(event: boolean){
    this.finish = !this.finish;
  }

  getVehiculo(){
    const data : DTOVehiculosGet ={
      placa: String(this.firstFormGroup.controls.placa.value),
      document_type: String(this.secondFormGroup.controls.identificationType.value),
      document_number: String(this.secondFormGroup.controls.identification.value),
      consultas: ['fasecolda', 'es_propietario', 'identif_vehiculo']
     }
    this.agenteService.getVehiculo(data).subscribe({
      next:(resp: any) => {
        if(resp.data.vehicle.plate === null || resp.data.vehicle.plate === ''|| resp.data.vehicle.plate === undefined){
          this.errorVehicle();
        }
        this.vehicle.data = resp.data;
        this.vehicle.datatwo = resp?.['0'];
      },
      error:(err: any)=>{
        this.errorVehicle();
      }
    });
  }

  errorVehicle(){
    Swal.fire({
      title: '¡No hemos encontrado tú vehiculo!',
      text: "Consulta por la referencia del vehiculo",
      icon: 'warning',
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'Buscar por referencia!',
      allowOutsideClick: false,
      allowEscapeKey: false,
    }).then((result) => {
      if (result.isConfirmed) {
        this.changeToReference(!this.references);
        this.backVehicle();
      }
    })
  }

  changeToReference(event: boolean){
    this.references = event;
  }

  changeVehicle(resp: any){
    this.vehicle = resp;
   //this.vehicle.vehicle = resp?.['0'].vehicle;
  }

  createObjectQuotation(){
    const placa = String(this.vehicle.data.vehicle.plate);
    const useType = this.vehicle.data.vehicle.vehicle_risk.use_type.toLowerCase();
    const codeFasecolda = this.vehicle.datatwo.vehicle.codification.code;
    const model = this.vehicle.data.vehicle.model;
    const email = String(this.fourFormGroup.controls.email.value);
    const plateType = String(this.thirdFormGroup.controls.placaType.value)
    const inAgency = this.thirdFormGroup.controls.concesionario.value === '' || this.thirdFormGroup.controls.concesionario.value === 'false' ? false : true;
    console.log(inAgency);
    const identificationType = String(this.fourFormGroup.controls.typeDocument.value);  
    const id = String(this.fourFormGroup.controls.document.value);
    const firstname = String(this.fourFormGroup.controls.name.value);
    const lastname = String(this.fourFormGroup.controls.familyname.value);
    const gender = String(this.fourFormGroup.controls.genres.value);
    const birhtDate = this.transversalService.dateParseYYMMDD(this.fourFormGroup.controls.birthdayDate.value);
    const occupation = String(this.fourFormGroup.controls.Occupation.value);
    const city: any = this.thirdFormGroup.controls.city.value;
    const accesories_price = String(this.thirdFormGroup.controls.accessoriesPrice.value);
    const reference_price = Number(this.thirdFormGroup.controls.vehiclePrice.value);

    const quotation: Quotation = {
      name: "event-create-quote",
      ipaddres: this.userIp,
      tenant_data: {
        name: "gran_titan.co.agentemotor.com",
        user_mail : email,
      },
      data: {
        business_line: "vehiculos",
        insurable_objects: [
            {
                type: 'vehicle',
                vehicle: {
                    plate: placa,
                    model: Number(model),
                    codification:{
                      code: codeFasecolda
                    },
                    vehicle_risk: {
                        accesories_price: accesories_price,
                        in_agency: inAgency,
                        use_type: useType,
                        plate_type: plateType,
                        commercial_price: reference_price
                    }
                }
            }
        ],
        parties: [
            {
                party_rol: "Asegurado",
                party_type: "person",
                person: {
                    identification_type: identificationType,
                    identification_number: id,
                    firstname: firstname,
                    lastname: lastname,
                    gender: gender,
                    birht_date: String(birhtDate),
                    occupation: occupation,
                    educational_level:"primary",
                    marital_status: "single"
                }
            }
        ],
        ubication: {
            place: {
                city_code: city.city_code,
                country_code: city.country_code,
            }
        }
      }
    };
    if(this.secondFormGroup.controls.identification.value === ''){
      quotation.data.insurable_objects[0].vehicle.force = "code"
    }
    return quotation;
  }

  sendQuotation(data: Quotation){
    this.agenteService.sendQuotation(data).subscribe({
      next: (data: any)=>{
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Your work has been saved',
          showConfirmButton: false,
          timer: 2000
        })
        this.urlCliente = this.sanitizer.bypassSecurityTrustResourceUrl(data.url_cliente);
      },
      error: (err)=>{
        console.log(err);
      }
    });
  }
  
  nextStepReference(){
    this.cleanStepTwo()
    setTimeout(()=>{
      this.stepper.next();
      this.stepper._steps.forEach((step, i)=>{
        if(i == 1) step.editable = false;
      });
    },100)
    const data : DTOReference = {
      marca: String(this.firstFormGroup.controls.brand.value),
      modelo: String(this.firstFormGroup.controls.model.value),
      reference: String(this.firstFormGroup.controls.reference.value)
    }
    this.agenteService.getVehicleByReference(data).subscribe({
      next: (data)=>{
        console.log(data);
        
        data.forEach((data)=>{
          this.vehicles.push(this.mapVehiculoData(data));
        })

      },error: (err)=>{
        console.log(err);
      }
    });
  }

  mapVehiculoData(datos: DTOVehiculoData) : DTOVehicleAdd{
    
    const data : DTOVehicleAdd = {
      datatwo: {
        vehicle: {
            vehicle_risk: datos.data.vehicle.vehicle_risk,
            code: '',
            line: '',
            codification: datos.data.vehicle.codification,
            weight: 0,
            model: 0,
            plate: '',
            brand: ''
        }
    },
    data: {
        vehicle: {
            plate: '',
            model: datos.data.vehicle.model,
            brand: datos.data.vehicle.brand,
            engine_number: '',
            chassis_number: '',
            vin: '',
            type: '',
            line: datos.data.vehicle.line,
            vehicle_codification: {
                cilindraje: datos.data.vehicle.codification.cylinder,
                capacidad_pasajeros: datos.data.vehicle.codification.number_passengers,
                peso: datos.data.vehicle.codification.weight
            },
            bodywork_type: '',
            fuel: '',
            vehicle_risk: {
                use_type: datos.data.vehicle.vehicle_risk.plate_type
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
    }
    return data;
  }

  cleanStepTwo(){
    this.secondFormGroup.controls?.['identification'].clearValidators();
    this.secondFormGroup.controls?.['identificationType'].clearValidators();
    this.secondFormGroup.controls?.['identification'].updateValueAndValidity();
    this.secondFormGroup.controls?.['identificationType'].updateValueAndValidity();
  }

  finalStep(){
    const data: Quotation = this.createObjectQuotation();
    this.sendQuotation(data);
  }

}
