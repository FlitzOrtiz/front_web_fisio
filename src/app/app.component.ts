import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TestComponent } from './patient/component/test/test.component'; 

import { LandingComponent } from './landing/pages/landing/landing.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, LandingComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'front_web_fisio';
}
