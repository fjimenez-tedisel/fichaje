import { DatePipe } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { AlertasService } from '../../services/alertas/alertas.service';


@Component({
  selector: 'app-fichaje',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './fichaje.component.html',
  styleUrl: './fichaje.component.css'
})
export class FichajeComponent {
  isEntryDisabled: boolean = false;
  isFinishDisabled: boolean = false;
  fechaActual!: Date;
  entryHour: string = "";
  finishHour: string = "";
  constructor(private alarmaService:AlertasService) {
    setInterval(() => {
      this.fechaActual = new Date();
    }, 1000);
  }
  setEntry() {
    this.alarmaService.mostrarAlertaConCancel('¡OJO!', '¿Seguro que quieres registrar la entrada?', 'warning')
    .then((result)=>{
      if(result.isConfirmed === true){
        const now = new Date();
        this.entryHour = now.toLocaleString(); // Guarda la fecha y hora actual
        this.isEntryDisabled = true
      }
    })
  }
  setFinish() {
    if (this.entryHour === ""){
      this.alarmaService.mostrarAlerta('Error', 'No puedes registrar la salida sin haber hecho una entrada', 'error')
    }else{
      this.alarmaService.mostrarAlertaConCancel('¡OJO!', '¿Seguro que quieres registrar la salida?', 'warning')
      .then((result)=>{
        if(result.isConfirmed === true){
          const now = new Date();
          this.finishHour= now.toLocaleString();
          this.isFinishDisabled = true; // Guarda la fecha y hora actual
        }
      })
    }
  }
  validate(){
    this.alarmaService.mostrarAlerta('', 'Se ha registrado la jornada correctamente', 'success')
    this.entryHour="";
    this.finishHour="";
    this.isEntryDisabled = false;
    this.isFinishDisabled = false;
    console.log("se valida");
  }
}

