import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { FbuttonComponent } from '../../../common/component/fbutton/fbutton.component';
import { LoginCameraComponent } from "../login-camera/login-camera.component";

@Component({
  selector: 'app-login-code',
  standalone: true,
  imports: [CommonModule, FormsModule, FbuttonComponent, LoginCameraComponent],
  templateUrl: './login-code.component.html',
  styleUrls: ['./login-code.component.scss']
})
export class LoginCodeComponent {
  loginCodeFinish = false;
  code: string = '';

  constructor(private router: Router) {}

  validateInput(): void {
    this.code = this.code.replace(/\D/g, '');
  }

  joinSession(): void {
    if (this.code.trim().length > 0) {
      this.loginCodeFinish = true;
    } else {
      alert('Por favor, introduzca un código numerico válido.');
    }
  }
}
