import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TransversalService {

  constructor() { 
    //
  }

  dateParseYYMMDD(fecha: any){
    console.log(fecha);
    
    const año = fecha.getFullYear(); // Obtener el año (1990)
    let mes = fecha.getMonth() + 1; // Obtener el mes (7). (+1 porque los meses en JavaScript son indexados desde 0)
    const día = fecha.getDate(); // Obtener el día (2)
    if(mes < 10)
      mes = '0' + mes;
    return(año + "-" + mes + "-" + día);
  }
  
  generateYearsArray() {
    const currentYear = new Date().getFullYear() +1;
    const yearsModel = [];
    for (let i = 0; i < 20; i++) {
      yearsModel.push((currentYear - i).toString());
    }
    return yearsModel;
  }
  
  limpiarTildes(cadena: string): string {
    const tildes: {[key: string]: string} = {
      'á': 'a',
      'é': 'e',
      'í': 'i',
      'ó': 'o',
      'ú': 'u',
      'Á': 'A',
      'É': 'E',
      'Í': 'I',
      'Ó': 'O',
      'Ú': 'U'
    };
    return cadena.replace(/[áéíóúÁÉÍÓÚ]/g, (match) => tildes[match] || match);
  }

  limpiarComas(cadena: string): string {
    const tildes: {[key: string]: string} = {
      ',': '.'
    };
    return cadena.replace(/[,]/g, (match) => tildes[match] || match);
  }
}
