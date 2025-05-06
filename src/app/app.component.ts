import { Component } from '@angular/core';
import { LandingComponent } from './landing/pages/landing/landing.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [LandingComponent],
  template: `<router-outlet></router-outlet>`,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'front_web_fisio';
}
