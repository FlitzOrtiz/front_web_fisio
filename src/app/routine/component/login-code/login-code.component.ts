import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FbuttonComponent } from '../../../common/component/fbutton/fbutton.component';

@Component({
  selector: 'app-login-code',
  imports: [CommonModule, FbuttonComponent],
  templateUrl: './login-code.component.html',
  styleUrls: ['./login-code.component.scss']
})
export class LoginCodeComponent {
  code: string = '';

  joinSession(): void {
    if (this.code.trim()) {
      console.log('Unirse con código:', this.code);
    } else {
      alert('Por favor, introduzca un código válido.');
    }
  }
}
