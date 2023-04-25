import { CommonModule } from '@angular/common';
import { Component,Output, EventEmitter } from '@angular/core';
@Component({
  selector: 'app-aseguradora-select',
  templateUrl: './aseguradora-select.component.html',
  styleUrls: ['./aseguradora-select.component.scss'],
  standalone: true,
  imports:[
    CommonModule
  ],
  providers:[

  ]
})
export class AseguradoraSelectComponent {
  @Output() eventCompare = new EventEmitter<string>();

  eventAseguradoraCompared() {
    this.eventCompare.emit('¡Hola, mundo!');
  }
}
