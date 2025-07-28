import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FbuttonComponent } from '../../../common/component/fbutton/fbutton.component';
import { SubscriptionService } from '../../service/subscription.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-month-pay',
  standalone: true,
  imports: [CommonModule, FbuttonComponent],
  templateUrl: './month-pay.component.html',
  styleUrls: ['./month-pay.component.scss'],
})
export class MonthPayComponent implements OnInit {
  userId!: number;
  errorMessage: string = '';

  constructor(
    private subscriptionService: SubscriptionService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const storedUserId = localStorage.getItem('userId');
    if (storedUserId) {
      this.userId = Number(storedUserId);
    } else {
      this.errorMessage = 'Por favor inicia sesión.';
    }
  }

  basicPlan = {
    title: 'Básico',
    price: '4.99',
    unit: '/mo',
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
    price: '9.99',
    unit: '/mo',
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

  subscribeToPlan(planTypeId: number) {
    this.errorMessage = ''; // Limpia mensaje previo

    this.subscriptionService
      .createSubscription(this.userId, planTypeId)
      .subscribe({
        next: (res: any) => {
          if (typeof res === 'string') {
            if (res.startsWith('https://') || res.startsWith('http://')) {
              window.open(res, '_blank');
            } else {
              this.errorMessage = 'Error: ' + res;
            }
          } else if (res?.redirectUrl) {
            this.router.navigate([res.redirectUrl]);
          } else {
            this.errorMessage =
              'Subscripción creada pero no se pudo redirigir automáticamente.';
          }
        },
        error: (err) => {
          console.error('Error creando subscripción', err);
          this.errorMessage =
            'Ya cuentas con una subscripción activa o ha ocurrido un error al procesar tu solicitud.';
        },
      });
  }
}
