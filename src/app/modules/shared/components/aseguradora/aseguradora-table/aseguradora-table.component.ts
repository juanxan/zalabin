import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SelectionModel} from '@angular/cdk/collections';

import { AutomovileComponent } from '../../automovile/automovile.component'

import { MatTableModule } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { Aseguradora } from 'src/app/infraestructure/common/interfaces/aseguradora.interface';
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import { AseguradoraSelectComponent } from '../aseguradora-select/aseguradora-select.component';
import { AseguradoraCompareComponent } from '../aseguradora-compare/aseguradora-compare.component';

@Component({
  selector: 'app-aseguradora-table',
  templateUrl: './aseguradora-table.component.html',
  styleUrls: ['./aseguradora-table.component.scss'],
  standalone: true,
  imports:[
    MatTableModule,
    MatPaginatorModule,
    MatCheckboxModule,
    CommonModule,
    AutomovileComponent,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    AseguradoraSelectComponent,
    AseguradoraCompareComponent
  ],
  providers:[
    
  ],
})
export class AseguradoraTableComponent  implements AfterViewInit{
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  compare = false;
  displayedColumns: string[] = ['comparar', 'name','danioTerceros', 'perdidaTotal', 'perdidaParcial','cobertura','valorAnual','actions'];
  dataSource = new MatTableDataSource<Aseguradora>(DATA_TABLE);
  selection = new SelectionModel<Aseguradora>(true, []);
  constructor(){
    //
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.dataSource.data);
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: Aseguradora): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;
  }
  
  compareAseguradora(evento: string){
    this.compare = !this.compare;
  }

}

const DATA_TABLE: Aseguradora[]=[
  {
    id: 1,
    comparar: true,
    name: '../../../assets/img/axa.png',
    danioTerceros: 'string',
    perdidaTotal: 'string',
    perdidaParcial: 'string',
    cobertura: 'string',
    valorAnual: 11000,
    actions: 'string'
  },
  {
    id: 2,
    comparar: true,
    name: '../../../assets/img/axa.png',
    danioTerceros: 'string',
    perdidaTotal: 'string',
    perdidaParcial: 'string',
    cobertura: 'string',
    valorAnual: 11000,
    actions: 'string'
  },
  {
    id: 3,
    comparar: true,
    name: '../../../assets/img/axa.png',
    danioTerceros: 'string',
    perdidaTotal: 'string',
    perdidaParcial: 'string',
    cobertura: 'string',
    valorAnual: 11000,
    actions: 'string'
  },
  {
    id: 4,
    comparar: true,
    name: '../../../assets/img/axa.png',
    danioTerceros: 'string',
    perdidaTotal: 'string',
    perdidaParcial: 'string',
    cobertura: 'string',
    valorAnual: 11000,
    actions: 'string'
  },
  {
    id: 5,
    comparar: true,
    name: '../../../assets/img/axa.png',
    danioTerceros: 'string',
    perdidaTotal: 'string',
    perdidaParcial: 'string',
    cobertura: 'string',
    valorAnual: 11000,
    actions: 'string'
  },
  {
    id: 6,
    comparar: true,
    name: '../../../assets/img/axa.png',
    danioTerceros: 'string',
    perdidaTotal: 'string',
    perdidaParcial: 'string',
    cobertura: 'string',
    valorAnual: 11000,
    actions: 'string'
  },
  {
    id: 7,
    comparar: true,
    name: '../../../assets/img/axa.png',
    danioTerceros: 'string',
    perdidaTotal: 'string',
    perdidaParcial: 'string',
    cobertura: 'string',
    valorAnual: 11000,
    actions: 'string'
  },
  {
    id: 8,
    comparar: true,
    name: '../../../assets/img/axa.png',
    danioTerceros: 'string',
    perdidaTotal: 'string',
    perdidaParcial: 'string',
    cobertura: 'string',
    valorAnual: 11000,
    actions: 'string'
  },
  {
    id: 9,
    comparar: true,
    name: '../../../assets/img/axa.png',
    danioTerceros: 'string',
    perdidaTotal: 'string',
    perdidaParcial: 'string',
    cobertura: 'string',
    valorAnual: 11000,
    actions: 'string'
  },
  {
    id: 10,
    comparar: true,
    name: '../../../assets/img/axa.png',
    danioTerceros: 'string',
    perdidaTotal: 'string',
    perdidaParcial: 'string',
    cobertura: 'string',
    valorAnual: 11000,
    actions: 'string'
  },
]