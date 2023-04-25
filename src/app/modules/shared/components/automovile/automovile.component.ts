import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
@Component({
  selector: 'app-automovile',
  templateUrl: './automovile.component.html',
  styleUrls: ['./automovile.component.scss'],
  standalone: true,
  imports:[
    CommonModule
  ]
})
export class AutomovileComponent {
@Input() placa!: string;
@Input() name!: string;
@Input() marca!: string;
@Input() referencia!: string;
@Input() anio!: string;

  constructor(){
    //
  }
}
