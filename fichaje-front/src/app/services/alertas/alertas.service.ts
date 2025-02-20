import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AlertasService {

  constructor() { }

  mostrarAlerta(titulo: string, mensaje: string, tipo: 'success' | 'error' | 'info' | 'warning' = 'info') {
    Swal.fire({
      title: titulo,
      text: mensaje,
      icon: tipo, 
      confirmButtonText: 'Aceptar'
    });
  }
  mostrarAlertaConCancel(titulo: string, mensaje: string, tipo: 'success' | 'error' | 'info' | 'warning' = 'info') {
      return Swal.fire({
      title: titulo,
      text: mensaje,
      icon: tipo,
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Aceptar',
      reverseButtons: true,
    });
  }
}
