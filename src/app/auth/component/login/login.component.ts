import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FbuttonComponent } from '../../../common/component/fbutton/fbutton.component';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, FbuttonComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  mostrarPassword: boolean = false;
  errorMessage: string = '';
  loading: boolean = false;
  googleWindow: Window | null = null;

  constructor(private authService: AuthService, private router: Router) {}

  togglePasswordVisibility() {
    this.mostrarPassword = !this.mostrarPassword;
  }

  redirectToGoogle() {
    this.loading = true;
    this.errorMessage = '';
    
    this.googleWindow = window.open(
      'https://accounts.google.com/v3/signin/identifier?continue=https%3A%2F%2Fwww.google.com%3Fhl%3Den-US&ec=GAlA8wE&hl=en&flowName=GlifWebSignIn&flowEntry=AddSession&dsh=S-1103312223%3A1753366901849398',
      '_blank'
    );

    const checkWindowClosed = setInterval(() => {
      if (this.googleWindow && this.googleWindow.closed) {
        clearInterval(checkWindowClosed);
        this.handleGoogleLogin();
      }
    }, 500);
  }

  private handleGoogleLogin() {
    this.authService.loginWithGoogle().subscribe({
      next: (res) => {
        localStorage.setItem('accessToken', res.accessToken);
        localStorage.setItem('userId', res.user.userId);
        console.log('accessToken:', res.accessToken);
        console.log('userId:', res.user.userId);
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        this.errorMessage = err.message || 'Error al iniciar sesión con Google';
        this.loading = false;
      },
      complete: () => {
        this.loading = false;
      },
    });
  }

  login() {
    if (!this.email) {
      this.errorMessage = 'El email es requerido';
      return;
    }

    if (!this.password) {
      this.errorMessage = 'La contraseña es requerida';
      return;
    }

    if (this.password.length < 6) {
      this.errorMessage = 'La contraseña debe tener al menos 6 caracteres';
      return;
    }

    this.loading = true;
    this.errorMessage = '';

    this.authService.login(this.email, this.password).subscribe({
      next: (res) => {
        localStorage.setItem('accessToken', res.accessToken);
        localStorage.setItem('userId', res.user.userId);
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        this.errorMessage = err.message || 'Error al iniciar sesión';
        this.loading = false;
      },
      complete: () => {
        this.loading = false;
      },
    });
  }
}