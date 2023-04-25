import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  private showSpinner$ = new BehaviorSubject<boolean>(false);

  constructor() {
    //
   }

  // Método para obtener el observable del estado del spinner
  getSpinnerState() {
    return this.showSpinner$.asObservable();
  }

  // Método para mostrar el spinner
  showSpinner() {
    this.showSpinner$.next(true);
  }

  // Método para ocultar el spinner
  hideSpinner() {
    this.showSpinner$.next(false);
  }
}
