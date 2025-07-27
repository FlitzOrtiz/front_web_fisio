import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FbuttonComponent } from '../../../common/component/fbutton/fbutton.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing-month-plans',
  standalone: true,
  imports: [CommonModule, FbuttonComponent],
  templateUrl: './landing-month-plans.component.html',
  styleUrls: ['./landing-month-plans.component.scss']
})
export class LandingMonthPlansComponent {
  constructor(private router: Router) {}

  basicPlan = {
    title: 'Básico',
    price: '4.99',
    unit: '/mo',
    items: ['$49.99', 'List item', 'List item', 'List item', 'List item'],
    buttonLabel: 'Comprar',
    highlight: false,
  };

  premiumPlan = {
    title: 'Premium',
    price: '9.99',
    unit: '/mo',
    items: ['$89.99 anual', 'List item', 'List item', 'List item', 'List item'],
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

  irAlLogin(): void {
    this.router.navigate(['/login']);
  }
}
