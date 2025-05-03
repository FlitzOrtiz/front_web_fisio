import { Component } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  mostrarPassword: boolean = false;

  togglePasswordVisibility() {
    this.mostrarPassword = !this.mostrarPassword;
  }
}
