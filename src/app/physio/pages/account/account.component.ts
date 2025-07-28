import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../service/user.service';
import { ConfigurationMenuComponent } from '../../component/configuration-menu/configuration-menu.component';
import { FbuttonComponent } from '../../../common/component/fbutton/fbutton.component';
import { CommonModule } from '@angular/common';
import { UserHeaderComponent } from '../../../common/component/user-header/user-header.component';

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
  ],
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

  profilePhoto: string | null = null;
  originalProfilePhoto: string | null = null;
  isPhotoUploading: boolean = false;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    const userData = localStorage.getItem('user');
    if (userData) {
      console.log('User data found in localStorage:', userData);
      const user = JSON.parse(userData);
      this.fullName = this.originalFullName = user.fullName;
      this.username = this.originalUsername = user.username;
      this.email = this.originalEmail = user.email;
      this.userService.getCachedAccount().subscribe((account: any) => {
        this.profilePhoto = account.profilePhoto || null;
        this.originalProfilePhoto = account.profilePhoto || null;
      });
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
        this.errorMessage =
          'El nombre de usuario debe tener al menos 3 caracteres.';
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
      },
    });
  }

  onProfilePhotoSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.profilePhoto = reader.result as string;
        // Guardar automáticamente al seleccionar
        if (
          this.profilePhoto &&
          this.profilePhoto !== this.originalProfilePhoto
        ) {
          this.isPhotoUploading = true;
          this.successMessage = '';
          this.errorMessage = '';
          this.userService.updateProfilePhoto(this.profilePhoto).subscribe({
            next: () => {
              // Obtener datos actualizados del usuario
              this.userService.getAccount().subscribe({
                next: (user) => {
                  localStorage.setItem('user', JSON.stringify(user));
                  this.profilePhoto = this.originalProfilePhoto =
                    user.profilePhoto || null;
                  this.successMessage =
                    'Foto de perfil actualizada correctamente.';
                  this.isPhotoUploading = false;
                },
                error: () => {
                  this.successMessage =
                    'Foto de perfil actualizada, pero no se pudo refrescar los datos.';
                  this.isPhotoUploading = false;
                },
              });
            },
            error: (err) => {
              this.errorMessage =
                'Ocurrió un error al actualizar la foto de perfil.';
              this.isPhotoUploading = false;
            },
          });
        }
      };
      reader.readAsDataURL(file);
    }
  }

  validEmail(email: string): boolean {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }
}
