import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FbuttonComponent } from '../../../common/component/fbutton/fbutton.component';
@Component({
  selector: 'app-login',
  imports: [CommonModule,FbuttonComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  mostrarPassword: boolean = false;

  togglePasswordVisibility() {
    this.mostrarPassword = !this.mostrarPassword;
  }
}
