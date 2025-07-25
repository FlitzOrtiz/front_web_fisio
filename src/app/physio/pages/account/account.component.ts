import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../service/user.service';
import { ConfigurationMenuComponent } from '../../component/configuration-menu/configuration-menu.component';
import { FbuttonComponent } from '../../../common/component/fbutton/fbutton.component';
import { UserHeaderComponent } from '../../../common/component/user-header/user-header.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ConfigurationMenuComponent,
    FbuttonComponent,
    UserHeaderComponent,
  ]
})
export class AccountComponent implements OnInit {
  fullName: string = '';
  username: string = '';
  email: string = '';

  originalFullName: string = '';
  originalUsername: string = '';
  originalEmail: string = '';

  successMessage: string = '';
  errorMessage: string = '';

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    const userData = localStorage.getItem('user');
    if (userData) {
      const user = JSON.parse(userData);
      this.fullName = this.originalFullName = user.fullName;
      this.username = this.originalUsername = user.username;
      this.email = this.originalEmail = user.email;
    }
  }

  actualizarCuenta() {
    this.successMessage = '';
    this.errorMessage = '';

    const data: any = {};

    if (this.fullName.trim() !== this.originalFullName) {
      if (!this.fullName.trim()) {
        this.errorMessage = 'El nombre completo no puede estar vacío.';
        return;
      }
      data.fullName = this.fullName.trim();
    }

    if (this.username.trim() !== this.originalUsername) {
      if (this.username.trim().length < 3) {
        this.errorMessage = 'El nombre de usuario debe tener al menos 3 caracteres.';
        return;
      }
      data.username = this.username.trim();
    }

    if (this.email.trim() !== this.originalEmail) {
      if (!this.validEmail(this.email.trim())) {
        this.errorMessage = 'El correo electrónico no es válido.';
        return;
      }
      data.email = this.email.trim();
    }

    if (Object.keys(data).length === 0) {
      this.errorMessage = 'No se han hecho cambios.';
      return;
    }

    this.userService.updateAccount(data).subscribe({
      next: () => {
        this.successMessage = 'Cuenta actualizada correctamente.';
        const userData = localStorage.getItem('user');
        if (userData) {
          const user = JSON.parse(userData);
          Object.assign(user, data);
          localStorage.setItem('user', JSON.stringify(user));
        }

        this.originalFullName = this.fullName.trim();
        this.originalUsername = this.username.trim();
        this.originalEmail = this.email.trim();
      },
      error: (err) => {
        if (err.status === 401) {
          this.errorMessage = 'Token inválido o expirado.';
        } else if (err.status === 400 && err.error?.message) {
          this.errorMessage = err.error.message;
        } else {
          this.errorMessage = 'Ocurrió un error al actualizar la cuenta.';
        }
      }
    });
  }

  validEmail(email: string): boolean {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }
}
