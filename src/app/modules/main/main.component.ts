import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  standalone: true,
  imports: [
    RouterModule,
    CommonModule
  ],
  providers:[
  ]
})
export class MainComponent  {

  constructor(){
    //
  }
  

}
