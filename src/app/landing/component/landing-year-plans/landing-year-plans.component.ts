import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FbuttonComponent } from '../../../common/component/fbutton/fbutton.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing-year-plans',
  standalone: true,
  imports: [CommonModule, FbuttonComponent],
  templateUrl: './landing-year-plans.component.html',
  styleUrls: ['./landing-year-plans.component.scss'],
})
export class LandingYearPlansComponent {
  errorMessage: string = '';

  basicPlan = {
    title: 'Básico',
    price: '49.99',
    unit: '/ye',
    items: ['$4.99 mensual', 'List item', 'List item', 'List item', 'List item'],
    buttonLabel: 'Comprar',
    highlight: false,
  };

  premiumPlan = {
    title: 'Premium',
    price: '89.99',
    unit: '/ye',
    items: ['$9.99 mensual', 'List item', 'List item', 'List item', 'List item'],
    buttonLabel: 'Comprar',
    highlight: true,
  };

  customPlan = {
    title: 'Personalizado',
    description: 'Facturación anual',
    text: 'Contáctanos para diseñar tu plan y obtener una cotización personalizada.',
    items: [
      'Soluciones a medida',
      'Atención prioritaria',
      'Ajustes flexibles',
      'Servicio 100% adaptado a ti',
    ],
    buttonLabel: 'Contáctanos',
    highlight: false,
  };

  constructor(private router: Router) {}

  irAlLogin(): void {
    this.router.navigate(['/login']);
  }
}
