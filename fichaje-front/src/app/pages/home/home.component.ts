import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { UserCardComponent } from '../../components/user-card/user-card.component';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ RouterLink , UserCardComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

deleteUser(){
console.log("usuario eliminado");
}

}
