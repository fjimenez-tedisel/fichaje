import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  form!:FormGroup 
  passwordVisible: boolean = false; 

  ngOnInit(){
    this.form = new FormGroup({
      'email': new FormControl(null, []),
      'password': new FormControl(null, []),
    });
  }

  onSumbit(){
    if (this.form.valid) {
      console.log('Formulario enviado:', this.form.value);
      this.form.reset();
    } else {
      console.log('Formulario inválido');
    }
  }

}
