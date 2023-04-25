import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { LoadingService } from '../services/loading.service';

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {

  constructor(private loadingService: LoadingService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // Mostrar el spinner antes de hacer la petición
    this.loadingService.showSpinner();

    return next.handle(request).pipe(
      // Ocultar el spinner al finalizar la petición
      finalize(() => this.loadingService.hideSpinner())
    );
  }
}
