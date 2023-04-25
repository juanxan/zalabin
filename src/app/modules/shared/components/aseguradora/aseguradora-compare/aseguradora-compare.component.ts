import { CommonModule } from '@angular/common';
import { Component,Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-aseguradora-compare',
  templateUrl: './aseguradora-compare.component.html',
  styleUrls: ['./aseguradora-compare.component.scss'],
  standalone: true,
  imports:[
    CommonModule
  ]
})
export class AseguradoraCompareComponent {
  @Output() eventoPersonalizado = new EventEmitter<string>();

  emitirEvento() {
    this.eventoPersonalizado.emit('¡Hola, mundo!');
  }
}
