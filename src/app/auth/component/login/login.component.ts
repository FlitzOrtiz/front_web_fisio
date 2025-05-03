import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  mostrarPassword: boolean = false;

  togglePasswordVisibility() {
    this.mostrarPassword = !this.mostrarPassword;
  }
}
