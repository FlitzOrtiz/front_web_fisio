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
    items: [
      'Acceso a ejercicios de fisioterapia',
      'Seguimiento de progreso semanal',
      '10 perfil de paciente',
      'Historial clínico limitado',
    ],
    buttonLabel: 'Comprar',
    highlight: false,
  };

  premiumPlan = {
    title: 'Premium',
    price: '89.99',
    unit: '/ye',
    items: [
      'Beneficios del plan Básico',
      'Ejercicios por patología',
      'Seguimientode progreso diario',
      'Hasta 50 perfiles de pacientes',
    ],
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
