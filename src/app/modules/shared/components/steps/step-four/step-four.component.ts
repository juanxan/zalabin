import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule  } from '@angular/common';
import { FormControl, FormBuilder, Validators,FormsModule, ReactiveFormsModule } from '@angular/forms';

import {MatSelectModule} from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from "@angular/material/form-field";
import {MatRadioModule} from '@angular/material/radio';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { MatStepperModule} from '@angular/material/stepper';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { AdministradorService } from 'src/app/infraestructure/services/administrador.service';
import { IParametric } from 'src/app/infraestructure/common/interfaces/parametric.interface';
import { Parametric } from 'src/app/modules/shared/enums/parametric.enum';

import { CalendarModule } from 'primeng/calendar';
export interface User {
  name: string;
}
@Component({
  selector: 'app-step-four',
  templateUrl: './step-four.component.html',
  styleUrls: ['./step-four.component.scss'],
  standalone: true,
  imports:[
    CommonModule,
    MatSelectModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatRadioModule,
    FormsModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatStepperModule,
    MatCheckboxModule,
    MatAutocompleteModule,
    CalendarModule
  ],
  providers:[
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: {displayDefaultIndicatorType: false},
    }
  ]
})
export class StepFourComponent implements OnInit{
  @Input() fourFormGroup =this._formBuilder.group({
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
  @Input() reference = false;
  @Output() eventToReference = new EventEmitter<boolean>();
  @Output() eventToFinish = new EventEmitter<boolean>();

  maxDate!: Date;

  myControl = new FormControl<string | User>('');
  options: User[] = [{name: 'Mary'}, {name: 'Shelley'}, {name: 'Igor'}];
  filteredOptions: Observable<User[]>;
  IdentificationType: IParametric[] = [];
  OccupationType: IParametric[] = [];

  constructor(
    private _formBuilder: FormBuilder,
    private readonly administratorService: AdministradorService
    )
    {
      this.getIdentificationType();
      this.getOccupation();
      
      this.filteredOptions = this.myControl.valueChanges.pipe(
        startWith(''),
        map(value => {
          const name = typeof value === 'string' ? value : value?.name;
          return name ? this._filter(name as string) : this.options.slice();
        }),
      );
    }
  ngOnInit(): void {
    this.generateMaxDate();
  }

    getIdentificationType(){
      this.administratorService.getParametric(Parametric.IdentificationType).subscribe((data)=>{
        this.IdentificationType = data;
      });
    }
    getOccupation(){
      const data: IParametric[] = [
        {code: 'Profesional Independiente', description: 'Profesional Independiente'},
        {code: 'Comerciante', description: 'Comerciante'},
        {code: 'Estudiante', description: 'Estudiante'},
        {code: 'Pensionado', description: 'Pensionado'},
        {code: 'Profesional Dependiente', description: 'Profesional Dependiente'},
        {code: 'No Profesional Dependiente', description: 'Profesional'},
        {code: 'Ama de casa', description: 'Ama de casa'}
    ]
//       Profesional
// Independiente".
// Opciones: "Comerciante", "Estudiante", "Pensionado", "Ama de casa",
// "Profesional Dependiente", "Profesional Independiente", "No Profesional
// Dependiente" 
      // this.administratorService.getParametric(Parametric.Profession).subscribe((data)=>{
        this.OccupationType = data;
      // });
    }

  generateMaxDate(){
    const fechaActual = new Date();
    // Restar 18 años a la fecha actual
    const fechaHace18Anios = new Date();
    fechaHace18Anios.setFullYear(fechaActual.getFullYear() - 18);
    
    // Obtener los componentes de la fecha (año, mes, día)
    const anio = fechaHace18Anios.getFullYear();
    const mes = fechaHace18Anios.getMonth() + 1; // El mes en JavaScript comienza desde 0, por lo que se suma 1
    const dia = fechaHace18Anios.getDate();
    
    // Formatear la fecha en "yy-mm-dd"
    const fechaFormateada = `${anio}-${mes < 10 ? '0' + mes : mes}-${dia < 10 ? '0' + dia : dia}`;
    
    this.maxDate = fechaHace18Anios;
    console.log(this.maxDate);
    this.fourFormGroup.controls.birthdayDate.setValue(fechaFormateada);
    
  }

    finish(){
      this.eventToReference.emit(true);
      this.eventToFinish.emit(true);
    }

    displayFn(user: User): string {
      return user && user.name ? user.name : '';
    }
  
    private _filter(name: string): User[] {
      const filterValue = name.toLowerCase();
      return this.options.filter(option => option.name.toLowerCase().includes(filterValue));
    }
}
