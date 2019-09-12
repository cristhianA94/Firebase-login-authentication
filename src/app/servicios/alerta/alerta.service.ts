import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AlertaService {

  constructor(private toastr: ToastrService) { }

  mensajeExito(titulo, mensaje) {
    this.toastr.success(mensaje, titulo);
  }
  mensajeError(titulo, mensaje){
    this.toastr.error(mensaje, titulo);

  }
}
