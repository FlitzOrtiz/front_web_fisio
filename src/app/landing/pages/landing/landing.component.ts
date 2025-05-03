import { Component } from '@angular/core';
import { HeaderComponent } from '../../component/header/header.component';
import { FooterComponent } from '../../component/footer/footer.component';

@Component({
  selector: 'app-landing',
  imports: [HeaderComponent, FooterComponent],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.scss',
})
export class LandingComponent {}
