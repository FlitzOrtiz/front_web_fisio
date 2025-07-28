import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FbuttonComponent } from '../../../common/component/fbutton/fbutton.component';
import { AuthService } from '../../service/auth.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  imports: [CommonModule, FbuttonComponent, FormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  mostrarPassword: boolean = false;

  fullName = '';
  email = '';
  password = '';
  username = '';
  profilePhoto: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  togglePasswordVisibility() {
    this.mostrarPassword = !this.mostrarPassword;
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.profilePhoto = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  onRegister() {
    const payload = {
      username: this.username.trim(),
      fullName: this.fullName.trim(),
      email: this.email.trim(),
      password: this.password,
      profilePhoto: this.profilePhoto,
    };
    this.authService.register(payload).subscribe({
      next: (_res: any) => {
        // Redirigir o mostrar mensaje de éxito
        this.router.navigate(['/login']);
      },
      error: (err: any) => {
        // Manejar error (mostrar mensaje, etc)
        alert('Error al registrar: ' + (err?.error?.message || ''));
      },
    });
  }

  redirectToGoogle() {
    window.open(
      'http://accounts.google.com/v3/signin/identifier?authuser=0&continue=https%3A%2F%2Fwww.google.com%2Fsearch%3Fq%3Dgoogle%26oq%3Dgoogle%26gs_lcrp%3DEgZjaHJvbWUqBwgAEAAYjwIyBwgAEAAYjwIyGAgBEC4YQxiDARjHARixAxjRAxiABBiKBTIGCAIQRRg7MgYIAxBFGDsyBggEEEUYPDIGCAUQRRg8MgYIBhBFGDwyBggHEEUYPNIBBzcxNWowajeoAgCwAgA%26sourceid%3Dchrome%26ie%3DUTF-8&ec=GAlAAQ&hl=es&flowName=GlifWebSignIn&flowEntry=AddSession&dsh=S523287708%3A1747617650285696',
      '_blank'
    );
  }
}
