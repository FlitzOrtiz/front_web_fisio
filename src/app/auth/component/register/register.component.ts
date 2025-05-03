import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FbuttonComponent } from '../../../common/component/fbutton/fbutton.component';

@Component({
  selector: 'app-register',
  imports: [CommonModule,FbuttonComponent],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  mostrarPassword: boolean = false;

  togglePasswordVisibility() {
    this.mostrarPassword = !this.mostrarPassword;
  }
}
