import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FbuttonComponent } from '../../../common/component/fbutton/fbutton.component';

@Component({
  selector: 'app-month-pay',
  standalone: true,
  imports: [CommonModule, FbuttonComponent],
  templateUrl: './month-pay.component.html',
  styleUrls: ['./month-pay.component.scss']
})
export class MonthPayComponent {
  basicPlan = {
    title: 'Básico',
    price: '4.99',
    unit: '/mo',
    items: ['$49.99', 'List item', 'List item', 'List item', 'List item'],
    buttonLabel: 'Comprar',
    highlight: false
  };

  premiumPlan = {
    title: 'Premium',
    price: '9.99',
    unit: '/mo',
    items: ['$89.99 anual', 'List item', 'List item', 'List item', 'List item'],
    buttonLabel: 'Comprar',
    highlight: true
  };

  customPlan = {
    title: 'Personalizado',
    description: 'Facturación anual.',
    text: 'Contáctanos para diseñar tu plan y obtener una cotización personalizada.',
    items: [
      'Soluciones a medida',
      'Atención prioritaria',
      'Ajustes flexibles',
      'Servicio 100% adaptado a ti'
    ],
    buttonLabel: 'Contáctanos',
    highlight: false
  };
}
