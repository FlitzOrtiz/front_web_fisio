import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../component/header/header.component';
import { FooterComponent } from '../../component/footer/footer.component';
import { WelcomeComponent } from '../../component/welcome/welcome.component';
import { InfoSectionComponent } from '../../component/info-section/info-section.component';
import { FaqSectionComponent } from '../../component/faq-section/faq-section.component';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [
    CommonModule,
    HeaderComponent,
    WelcomeComponent,
    FooterComponent,
    InfoSectionComponent,
    FaqSectionComponent,
  ],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.scss',
})
export class LandingComponent {
  infoSections = [
    {
      title: '¿Qué es El Chueco?',
      subtitle: 'Convierte la rehabilitación en un juego',
      description:
        'El Chueco es una aplicación web que combina movimiento, video y tecnología para transformar ejercicios terapéuticos en experiencias atractivas. Ideal para fisioterapeutas que buscan motivar y monitorear a sus pacientes de manera remota o presencial.',
      features: [
        { icon: '🏆', text: 'Facil para pacientes' },
        { icon: '📹', text: 'Rutinas con videos de YouTube o propios' },
        { icon: '🎥', text: 'Seguimiento con cámara e IA' },
        { icon: '📊', text: 'Reportes automáticos para el médico' },
        { icon: '⌚', text: 'Rutinas en menos de 15 minutos' },
      ],
      imagePath: 'assets/landing_main_image.jpeg',
      imageAlt: 'Paciente realizando ejercicios con El Chueco',
      imageOnRight: true,
    },
    {
      title: 'Seguimiento en tiempo real',
      subtitle: 'Monitoriza el progreso de tus pacientes',
      description:
        'Nuestra plataforma permite a los fisioterapeutas supervisar en tiempo real los ejercicios realizados por los pacientes. La tecnología de seguimiento detecta la correcta ejecución de los movimientos y proporciona feedback inmediato.',
      features: [
        { icon: '📊', text: 'Análisis detallado de cada sesión' },
        { icon: '🔍', text: 'Detección de errores en la ejecución' },
        { icon: '📱', text: 'Compatible con dispositivos móviles' },
        { icon: '🔔', text: 'Alertas para correcciones posturales' },
      ],
      imagePath: 'assets/landing_calendar.jpeg',
      imageAlt: 'Dashboard de seguimiento de pacientes',
      imageOnRight: false,
    },
    {
      title: 'Biblioteca de ejercicios',
      subtitle: 'Amplia variedad de rutinas terapéuticas',
      description:
        'Accede a nuestra extensa biblioteca de ejercicios diseñados por profesionales de la fisioterapia. Personaliza las rutinas según las necesidades específicas de cada paciente y patología.',
      features: [
        { icon: '📚', text: 'Más de 200 ejercicios categorizados' },
        { icon: '🔄', text: 'Actualización constante de contenido' },
        { icon: '⭐', text: 'Ejercicios para todas las condiciones' },
        { icon: '✏️', text: 'Posibilidad de crear ejercicios personalizados' },
      ],
      imagePath: 'assets/landing_chueco.jpeg',
      imageAlt: 'Biblioteca de ejercicios terapéuticos',
      imageOnRight: true,
    },
    {
      title: 'Telerehabilitación avanzada',
      subtitle: 'Atención a distancia sin perder calidad',
      description:
        'Lleva la fisioterapia más allá del consultorio con nuestra plataforma de telerehabilitación. Mantén la calidad de la atención mientras tus pacientes realizan los ejercicios desde la comodidad de su hogar.',
      features: [
        { icon: '🌐', text: 'Sesiones virtuales en tiempo real' },
        { icon: '📆', text: 'Programación de rutinas semanales' },
        { icon: '📈', text: 'Estadísticas de adherencia al tratamiento' },
        { icon: '💬', text: 'Chat integrado para consultas' },
      ],
      imagePath: 'assets/landing_map.jpeg',
      imageAlt: 'Sesión de telerehabilitación',
      imageOnRight: false,
    },
  ];
}
