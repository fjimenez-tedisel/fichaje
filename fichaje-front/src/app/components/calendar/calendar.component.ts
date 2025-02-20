import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatCalendarCellClassFunction } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatCardModule} from '@angular/material/card';
import { DatePipe } from '@angular/common';
import { AlertasService } from '../../services/alertas/alertas.service';

@Component({
  selector: 'app-calendar',
  standalone:true,
  encapsulation: ViewEncapsulation.None,
  providers: [provideNativeDateAdapter(), DatePipe],
  imports: [MatFormFieldModule, MatInputModule, MatDatepickerModule, MatCardModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.css'
})
export class CalendarComponent {
  fechaSeleccionada: Date | null = null;
    formattedDate: string = '';
    festivos: string[] = [
      '2025-01-01', // Año Nuevo
      '2025-01-06', // Reyes Magos
      '2025-04-18', // Viernes Santo
      '2025-05-01', // Día del Trabajador
      '2025-06-24', // San Juan (Barcelona)
      '2025-08-15', // Asunción
      '2025-09-11', // Diada de Cataluña
      '2025-10-12', // Fiesta Nacional de España
      '2025-11-01', // Todos los Santos
      '2025-12-06', // Día de la Constitución
      '2025-12-25', // Navidad
    ];
    diasSeleccionados: String[] = [];
    diasAprobados: String[]=[];
    constructor(private datePipe: DatePipe, 
      private alarmaService:AlertasService) {}
     // Función para marcar los días festivos en el calendario sin errores de zona horaria
     fechaMarcada!: Date;
     diaSelec!: String;

     filtrarDias = (date: Date | null): boolean => {
      if (!date) return false; // Si no hay fecha, no permitir selección
  
      const day = date.getDay(); // Obtiene el día de la semana (0 = Domingo, 6 = Sábado)
      return day !== 0 && day !== 6; // Solo permite lunes (1) a viernes (5)
    };

     // Función que marca el día específico
     dateClass: MatCalendarCellClassFunction<Date> = (cellDate, view) => {
      if (view === 'month') {  
        const year = cellDate.getFullYear();
        const month = (cellDate.getMonth() + 1).toString().padStart(2, '0'); // Asegurar formato MM
        const day = cellDate.getDate().toString().padStart(2, '0'); // Asegurar formato DD
    
        const dateString = `${year}-${month}-${day}`; // Formato YYYY-MM-DD
    
        // Definir clases según los arrays
        const clases: string[] = [];
    
        if (this.diasSeleccionados.includes(dateString)) {
          clases.push('seleccionados'); // Clase para días seleccionados
        }
        if (this.diasAprobados.includes(dateString)) {
          clases.push('vacaciones'); // Clase para días seleccionados
        }
        if (this.festivos.includes(dateString)) {
          clases.push('festivo'); // Clase para días festivos
        }
    
        return clases.join(' '); // Retorna ambas clases separadas por espacio
      }
    
      return '';
    };
  
  onDateSelected(data: any, calendar:any){
    this.diaSelec = this.formatDate(data);
    const index = this.diasSeleccionados.findIndex(dia => dia === this.diaSelec);
    if (index !== -1) {
      this.diasSeleccionados.splice(index, 1);
    }else{
      this.diasSeleccionados.push(this.diaSelec);
    }

    calendar.updateTodaysDate();
  
    
    console.log(this.diasSeleccionados);
  }
  formatDate(data: Date) {
    console.log(data)
      this.formattedDate = this.datePipe.transform(data, 'yyyy-MM-dd') || '';
      return this.formattedDate
  }
  validateDays(calendar:any){
    if(this.diasSeleccionados.length === 0){
      this.alarmaService.mostrarAlerta('','No hay dias seleccionados', 'warning')
    }else{
      this.alarmaService.mostrarAlertaConCancel('','¿Seguro que quieres valdiar estos dias?', 'warning')
      .then((res)=> {
        if(res.isConfirmed){
          this.diasAprobados.push(...this.diasSeleccionados)
          this.diasSeleccionados = [];
          calendar.updateTodaysDate();
          this.diasAprobados = [...new Set(this.diasAprobados)];
        }

      })
    }


  }

}

