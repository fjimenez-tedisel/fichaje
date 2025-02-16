import { Component } from '@angular/core';

@Component({
  selector: 'app-fichaje',
  standalone: true,
  imports: [],
  templateUrl: './fichaje.component.html',
  styleUrl: './fichaje.component.css'
})
export class FichajeComponent {
  ultimaFichada: string = '';
  
  fichar() {
    const ahora = new Date();
    this.ultimaFichada = ahora.toLocaleString(); // Guarda la fecha y hora actual
  }
}

