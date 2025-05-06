import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LandingComponent } from './landing/pages/landing/landing.component';
import { LoginCodeComponent } from './routine/component/login-code/login-code.component';
import { LoginComponent } from './auth/component/login/login.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  template: `<router-outlet></router-outlet>`,
  //imports: [RouterOutlet, LoginComponent],
  //templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'front_web_fisio';
}

