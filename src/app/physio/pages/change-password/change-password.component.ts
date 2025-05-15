import { Component } from '@angular/core';
import { ConfigurationMenuComponent } from "../../component/configuration-menu/configuration-menu.component";
import { FbuttonComponent } from "../../../common/component/fbutton/fbutton.component";
import { UserHeaderComponent } from "../../../common/component/user-header/user-header.component";
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss'],
  standalone: true,
  imports: [FormsModule, ConfigurationMenuComponent, FbuttonComponent, UserHeaderComponent, CommonModule],
  providers: []
})

export class ChangePasswordComponent {
  currentPassword = '';
  newPassword = '';
  confirmPassword = '';
  showCurrentPassword = false;
  showNewPassword = false;
  showConfirmPassword = false;

  passwordRules = [
    { text: 'Como mínimo 8 caracteres', valid: false },
    { text: 'Letras mayúsculas y minúsculas', valid: false },
    { text: 'Número', valid: false },
    { text: 'Todos los símbolos son válidos', valid: false },
    { text: 'Las contraseñas coinciden', valid: false },
  ];

  onPasswordChange() {
    console.log("Se está ejecutando onPasswordChange");
    alert("Se está ejecutando onPasswordChange");
    const password = this.newPassword;
    const confirm = this.confirmPassword;

    this.passwordRules[0].valid = password.length >= 8;
    this.passwordRules[1].valid = /[a-z]/.test(password) && /[A-Z]/.test(password);
    this.passwordRules[2].valid = /\d/.test(password);
    this.passwordRules[3].valid = /[^A-Za-z0-9]/.test(password);
    this.passwordRules[4].valid = password === confirm && password.length > 0;
  }

    togglePasswordVisibility(field: 'current' | 'new' | 'confirm') {
    if (field === 'current') {
        this.showCurrentPassword = !this.showCurrentPassword;
    } else if (field === 'new') {
        this.showNewPassword = !this.showNewPassword;
    } else if (field === 'confirm') {
        this.showConfirmPassword = !this.showConfirmPassword;
    }
    }

}
  