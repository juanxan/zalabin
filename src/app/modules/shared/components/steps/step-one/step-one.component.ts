import { Component, Input, Output,EventEmitter,OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormBuilder, Validators,FormsModule, ReactiveFormsModule,FormControl, FormGroup } from '@angular/forms';

import { MatStepperModule} from '@angular/material/stepper';
import { MatInputModule } from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { LoginService } from 'src/app/infraestructure/services/login.service';
import { AgenteMotorService } from 'src/app/infraestructure/services/agente-motor.service';
import { LoadingService } from 'src/app/infraestructure/services/loading.service';
import { LoadingComponent } from '../../loading/loading.component';
import { TransversalService } from 'src/app/infraestructure/services/transversal.service';

@Component({
  selector: 'app-step-one',
  templateUrl: './step-one.component.html',
  styleUrls: ['./step-one.component.scss'],
  standalone:true,
  imports: [
    FormsModule, 
    ReactiveFormsModule,
    MatStepperModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule,
    CommonModule,
    LoadingComponent
  ],
  providers:[
    HttpClientModule
  ]
})
export class StepOneComponent implements OnInit{
  @Input() reference = false;
  @Input() firstFormGroup : FormGroup =  this._formBuilder.group({
    placa: [''],
    brand: [''],
    model: [''],
    reference: ['']
  });
  @Output() eventToReference = new EventEmitter<boolean>();
  @Output() eventSecondReference = new EventEmitter<boolean>();

  brands: string[] = [];
  yearsModel: string[] = []; 
  references: string[] = [];

  constructor(private _formBuilder: FormBuilder,
    private readonly loginService: LoginService,
    private readonly agenteMotorService: AgenteMotorService,
    private readonly loadingService: LoadingService,
    private readonly transversalService: TransversalService
    ){
      this.firstForm();
      this.generateYearsArray();
    }

  ngOnInit(): void {
    this.login();
    
  }

  changeToReference(){
    if(!this.reference){
      this.secondForm();
    }
    if(this.reference){
      this.firstForm();
    }
    this.eventToReference.emit(!this.reference);
  }

  firstForm() {
    this.firstFormGroup.reset({
      placa: '',
      brand: null,
      model: null,
      reference: null
    });
    this.firstFormGroup.controls?.['placa'].setValidators(Validators.required,);
    this.firstFormGroup.controls?.['placa'].setValidators(Validators.maxLength(6));
    this.firstFormGroup.controls?.['placa'].setValidators(Validators.pattern('^[a-zA-Z]{3}[0-9]{2}[a-zA-Z0-9]{0,1}$'));
    this.firstFormGroup.controls?.['brand'].clearValidators();
    this.firstFormGroup.controls?.['model'].clearValidators();
    this.firstFormGroup.controls?.['reference'].clearValidators();
    this.updateValueAndValidityForm();
  }
  
  secondForm() {
    this.firstFormGroup.reset({
      placa: null,
      brand: '',
      model: '',
      reference: ''
    });
    this.firstFormGroup.controls?.['placa'].clearValidators();
    this.firstFormGroup.controls?.['brand'].setValidators(Validators.required);
    this.firstFormGroup.controls?.['model'].setValidators(Validators.required);
    this.firstFormGroup.controls?.['reference'].setValidators(Validators.required);
    this.updateValueAndValidityForm();
  }

  updateValueAndValidityForm(){
    this.firstFormGroup.controls?.['placa'].updateValueAndValidity();
    this.firstFormGroup.controls?.['brand'].updateValueAndValidity();
    this.firstFormGroup.controls?.['model'].updateValueAndValidity();
    this.firstFormGroup.controls?.['reference'].updateValueAndValidity();
  }

  login(){
    this.loginService.login().subscribe({
      next: (data)=>{
        this.getBrand();
      },
      error: (err)=>{
        console.log(err);
      }
    });
  }


  generateYearsArray() {
    this.yearsModel = this.transversalService.generateYearsArray();
  }

  getBrand(){
    this.loadingService.showSpinner();
    this.agenteMotorService.getBrand().subscribe({
      next: (data)=>{
        this.brands = data.sort();
      },
      error: (err)=>{
        console.log(err);
      }
    });
  }

  getReference(){
    if(this.firstFormGroup.get('brand')?.value !== '' && this.firstFormGroup.get('model')?.value !== ''){
      this.agenteMotorService.getReference({
        marca: this.firstFormGroup.get('brand')?.value,
        modelo: this.firstFormGroup.get('model')?.value,
      }).subscribe({
        next: (data)=>{
          this.references = data.sort();
        },
        error: (err)=>{
          console.log(err);
        }
      });
    }
  }

  nextStepReference(){
    this.eventSecondReference.emit(true);
  }
}
