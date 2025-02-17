import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';

@Component({
  selector: 'app-vacaciones',
  standalone: true,
  imports: [CalendarModule, FormsModule],
  templateUrl: './vacaciones.component.html',
  styleUrl: './vacaciones.component.css'
})
export class VacacionesComponent {
  date!: Date; // Se almacenará la fecha seleccionada
}
