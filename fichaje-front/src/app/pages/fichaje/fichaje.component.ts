import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';


@Component({
  selector: 'app-fichaje',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './fichaje.component.html',
  styleUrl: './fichaje.component.css'
})
export class FichajeComponent {
  ultimaFichada: string = '';
  fechaActual!: Date;
  entryHour: string = "";
  finishHour: string = "";

  constructor() {
    setInterval(() => {
      this.fechaActual = new Date();
    }, 1000);
  }
  
  setEntry() {
    const now = new Date();
    this.entryHour = now.toLocaleString(); // Guarda la fecha y hora actual
  }
  setFinish() {
    const now = new Date();
    this.finishHour= now.toLocaleString(); // Guarda la fecha y hora actual
  }
}

