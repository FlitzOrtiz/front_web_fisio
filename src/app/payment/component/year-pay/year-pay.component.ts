import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FbuttonComponent } from '../../../common/component/fbutton/fbutton.component';
import { SubscriptionService } from '../../service/subscription.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-year-pay',
  standalone: true,
  imports: [CommonModule, FbuttonComponent],
  templateUrl: './year-pay.component.html',
  styleUrls: ['./year-pay.component.scss'],
})
export class YearPayComponent implements OnInit {
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
      console.log('User ID:', this.userId);
      console.log('Access Token:', localStorage.getItem('accessToken'));
    } else {
      this.errorMessage = 'Por favor inicia sesión.';
    }
  }

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

  subscribeToPlan(planTypeId: number) {
    this.errorMessage = '';
    this.subscriptionService.createSubscription(this.userId, planTypeId).subscribe({
      next: (res: any) => {
        console.log('Respuesta de subscripción:', res);

        if (typeof res === 'string') {
          if (res.startsWith('https://') || res.startsWith('http://')) {
            window.open(res, '_blank');
          } else {
            this.errorMessage = 'Error: ' + res;
          }
        } else if (res?.redirectUrl) {
          this.router.navigate([res.redirectUrl]);
        } else {
          this.errorMessage = 'Subscripción creada pero no se pudo redirigir automáticamente.';
        }
      },
      error: (err) => {
        console.error('Error creando subscripción', err);
        this.errorMessage = 'Ya cuentas con una subscripción activa o ha ocurrido un error al procesar tu solicitud.';
      },
    });
  }
}
