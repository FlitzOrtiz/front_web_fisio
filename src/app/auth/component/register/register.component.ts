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

    redirectToGoogle() {
    window.open(
      'http://accounts.google.com/v3/signin/identifier?authuser=0&continue=https%3A%2F%2Fwww.google.com%2Fsearch%3Fq%3Dgoogle%26oq%3Dgoogle%26gs_lcrp%3DEgZjaHJvbWUqBwgAEAAYjwIyBwgAEAAYjwIyGAgBEC4YQxiDARjHARixAxjRAxiABBiKBTIGCAIQRRg7MgYIAxBFGDsyBggEEEUYPDIGCAUQRRg8MgYIBhBFGDwyBggHEEUYPNIBBzcxNWowajeoAgCwAgA%26sourceid%3Dchrome%26ie%3DUTF-8&ec=GAlAAQ&hl=es&flowName=GlifWebSignIn&flowEntry=AddSession&dsh=S523287708%3A1747617650285696', 
      '_blank'
    );
  }
}
