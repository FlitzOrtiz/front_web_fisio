import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LandingComponent } from './landing/pages/landing/landing.component';
import { LoginCodeComponent } from './routine/component/login-code/login-code.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, LandingComponent, LoginCodeComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'front_web_fisio';
}

