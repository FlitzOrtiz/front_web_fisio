import { Component } from '@angular/core';
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
export class YearPayComponent {
  userId = 1; // Cambia esto por el ID real del usuario logueado si es necesario

  constructor(
    private subscriptionService: SubscriptionService,
    private router: Router
  ) {}

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
  this.subscriptionService.createSubscription(this.userId, planTypeId).subscribe({
    next: (res: any) => {
      console.log('Respuesta de subscripción:', res);

      if (typeof res === 'string') {
        // Caso: el backend devuelve directamente la URL del checkout de PayPal como string
        if (res.startsWith('https://') || res.startsWith('http://')) {
          window.open(res, '_blank');
        } else {
          alert('Error: ' + res);
        }
      } else if (res?.redirectUrl) {
        // Caso: después del pago, el backend devuelve un JSON con redirectUrl
        this.router.navigate([res.redirectUrl]);
      } else {
        alert('Subscripción creada pero no se pudo redirigir automáticamente.');
      }
    },
    error: (err) => {
      console.error('Error creando subscripción', err);
      alert('Ya cuentas con una subscripción activa o ha ocurrido un error al procesar tu solicitud.');
    },
  });
}
}
