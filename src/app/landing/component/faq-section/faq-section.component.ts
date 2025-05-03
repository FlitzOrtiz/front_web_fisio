import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface FaqItem {
  question: string;
  answer: string;
  isOpen: boolean;
}

@Component({
  selector: 'app-faq-section',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './faq-section.component.html',
  styleUrl: './faq-section.component.scss',
})
export class FaqSectionComponent {
  faqItems: FaqItem[] = [
    {
      question: '¿Cómo programo una sesión de fisioterapia?',
      answer:
        '¡La programación es fácil! Simplemente regístrese en nuestra plataforma, explore fisioterapeutas disponibles y seleccione una ranura de tiempo conveniente en el calendario. Puede programar citas virtuales y en persona en función de sus necesidades.',
      isOpen: true,
    },
    {
      question: '¿Qué tipos de servicios de fisioterapia ofrecen?',
      answer:
        'Ofrecemos una gama integral de servicios de fisioterapia que incluyen rehabilitación de lesiones deportivas, recuperación posquirúrgica, manejo del dolor crónico, corrección de postura y atención preventiva. Nuestros profesionales certificados están equipados para abordar las condiciones agudas y crónicas.',
      isOpen: false,
    },
    {
      question: '¿Puedo acceder a mis rutinas de ejercicio entre citas?',
      answer:
        '¡Sí! Después de su sesión, su fisioterapeuta creará una rutina de ejercicios personalizada a la que puede acceder en cualquier momento a través de nuestra plataforma. Las rutinas incluyen guías de video para garantizar funciones de seguimiento y técnicas adecuadas para monitorear su progreso.',
      isOpen: false,
    },
    {
      question: '¿Cómo funcionan las sesiones de fisioterapia virtual?',
      answer:
        'Las sesiones virtuales tienen lugar a través de nuestra plataforma de video segura. Su fisioterapeuta lo guiará a través de evaluaciones y ejercicios de forma remota, proporcionando comentarios en tiempo real. Todo lo que necesita es un dispositivo con una cámara y suficiente espacio para moverse cómodamente.',
      isOpen: false,
    },
    {
      question: '¿Qué métodos de pago acepta?',
      answer:
        'Aceptamos todas las principales tarjetas de crédito, tarjetas de débito y soluciones de pago digital. También se aceptan muchos planes de seguro, y puede verificar la cobertura directamente a través de nuestra plataforma antes de reservar.',
      isOpen: false,
    },
  ];

  toggleQuestion(index: number): void {
    this.faqItems[index].isOpen = !this.faqItems[index].isOpen;
  }
}
