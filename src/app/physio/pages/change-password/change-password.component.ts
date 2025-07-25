import { Component } from '@angular/core';
import { ConfigurationMenuComponent } from "../../component/configuration-menu/configuration-menu.component";
import { FbuttonComponent } from "../../../common/component/fbutton/fbutton.component";
import { UserHeaderComponent } from "../../../common/component/user-header/user-header.component";
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UserService } from '../../service/user.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss'],
  standalone: true,
  imports: [FormsModule, ConfigurationMenuComponent, FbuttonComponent, UserHeaderComponent, CommonModule]
})
export class ChangePasswordComponent {
  currentPassword = '';
  newPassword = '';
  confirmPassword = '';
  showCurrentPassword = false;
  showNewPassword = false;
  showConfirmPassword = false;

  successMessage = '';
  errorMessage = '';

  passwordRules = [
    { text: 'Como mínimo 8 caracteres', valid: false },
    { text: 'Letras mayúsculas y minúsculas', valid: false },
    { text: 'Número', valid: false },
    { text: 'Al menos un símbolo válido', valid: false },
    { text: 'Las contraseñas coinciden', valid: false },
  ];

  constructor(private userService: UserService) {}

  onPasswordChange() {
    const password = this.newPassword;
    const confirm = this.confirmPassword;

    this.passwordRules[0].valid = password.length >= 8;
    this.passwordRules[1].valid = /[a-z]/.test(password) && /[A-Z]/.test(password);
    this.passwordRules[2].valid = /\d/.test(password);
    this.passwordRules[3].valid = /[^A-Za-z0-9]/.test(password);
    this.passwordRules[4].valid = password === confirm && password.length > 0;
  }

  togglePasswordVisibility(field: 'current' | 'new' | 'confirm') {
    if (field === 'current') this.showCurrentPassword = !this.showCurrentPassword;
    if (field === 'new') this.showNewPassword = !this.showNewPassword;
    if (field === 'confirm') this.showConfirmPassword = !this.showConfirmPassword;
  }

  guardarNuevaContrasena() {
    this.successMessage = '';
    this.errorMessage = '';

    if (!this.currentPassword.trim() || !this.newPassword.trim() || !this.confirmPassword.trim()) {
      this.errorMessage = 'Todos los campos son obligatorios.';
      return;
    }

    this.onPasswordChange();
    const reglasValidas = this.passwordRules.every(rule => rule.valid);
    if (!reglasValidas) {
      this.errorMessage = 'La nueva contraseña no cumple con los requisitos.';
      return;
    }

    this.userService.changePassword(this.currentPassword.trim(), this.newPassword.trim()).subscribe({
      next: () => {
        this.successMessage = 'Contraseña actualizada correctamente.';
        this.currentPassword = '';
        this.newPassword = '';
        this.confirmPassword = '';
        this.passwordRules.forEach(rule => rule.valid = false);
      },
      error: (err) => {
        if (err.status === 401) {
          this.errorMessage = 'Contraseña actual incorrecta o token expirado.';
        } else if (err.status === 400 && err.error?.message) {
          this.errorMessage = err.error.message;
        } else {
          this.errorMessage = 'La contraseña actual es incorrecta o ocurrió un error al actualizar la contraseña.';
        }
      }
    });
  }
}
