import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FbuttonComponent } from '../../../common/component/fbutton/fbutton.component';

@Component({
  selector: 'app-year-pay',
  standalone: true,
  imports: [CommonModule, FbuttonComponent],
  templateUrl: './year-pay.component.html',
  styleUrls: ['./year-pay.component.scss'],
})
export class YearPayComponent {
  basicPlan = {
    title: 'Básico',
    price: '49.99',
    unit: '/ye',
    items: ['$4.99', 'List item', 'List item', 'List item', 'List item'],
    buttonLabel: 'Comprar',
    highlight: false,
  };

  premiumPlan = {
    title: 'Premium',
    price: '89.99',
    unit: '/ye',
    items: ['$9.99 anual', 'List item', 'List item', 'List item', 'List item'],
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
}
