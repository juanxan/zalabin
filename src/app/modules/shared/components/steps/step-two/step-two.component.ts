import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, Validators,FormsModule, ReactiveFormsModule,FormControl, FormGroup } from '@angular/forms';

import { MatStepperModule} from '@angular/material/stepper';
import {MatSelectModule} from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from "@angular/material/form-field";
import { StepTwoService } from 'src/app/infraestructure/services/step-two.service';
import { CommonModule } from '@angular/common';
import { AdministradorService } from 'src/app/infraestructure/services/administrador.service';
import { Parametric } from 'src/app/modules/shared/enums/parametric.enum';
import { IParametric } from 'src/app/infraestructure/common/interfaces/parametric.interface';

@Component({
  selector: 'app-step-two',
  templateUrl: './step-two.component.html',
  styleUrls: ['./step-two.component.scss'],
  standalone: true,
  imports: [
    MatSelectModule,
    MatIconModule,
    MatFormFieldModule,
    FormsModule, ReactiveFormsModule,
    MatInputModule,
    MatStepperModule,
    CommonModule
  ],
  providers:[
    AdministradorService,
    StepTwoService
  ]
})
export class StepTwoComponent {
  @Output() eventSecondGroup = new EventEmitter<boolean>();
  @Input() reference = false;
  @Input() secondFormGroup : FormGroup =  this._formBuilder.group({
    identificationType: ['', Validators.required],
    identification: ['', Validators.required],
  });
  IdentificationType: IParametric[] = [];

  constructor(
    private _formBuilder: FormBuilder,
    private readonly twoService: StepTwoService,
    private readonly administratorService: AdministradorService
    ){
      this.getIdentificationType();
    }

  vehiculosAdd(){
    this.eventSecondGroup.emit(true);
  }

  getIdentificationType(){
    this.administratorService.getParametric(Parametric.IdentificationType).subscribe({
      next:(resp) => {
        this.IdentificationType[0]={
          isActive: true,
          default: false,
          creationTime: new Date(),
          code : '',
          description: '',
          iconCode: ''
        }
        this.IdentificationType = resp;
      },
      error:(err)=>{
        console.log(err);
      }
    });
  }
}
