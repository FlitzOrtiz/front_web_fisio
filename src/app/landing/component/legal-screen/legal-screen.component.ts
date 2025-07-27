import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-legal-screen',
  standalone: true,
  templateUrl: './legal-screen.component.html',
  styleUrls: ['./legal-screen.component.scss'],
  imports: [CommonModule],
})
export class LegalScreenComponent {
  serviceTerms: string = `
En El Chueco, ofrecemos servicios digitales diseñados para apoyar el proceso de fisioterapia a través de herramientas tecnológicas accesibles.

Al utilizar nuestros servicios, aceptas automáticamente nuestros términos de uso, los cuales incluyen:

- El uso personal, no comercial, de la plataforma.
- El respeto a la propiedad intelectual del contenido ofrecido.
- La abstención de cualquier actividad que intente interrumpir, dañar o comprometer la seguridad del sistema.

Nos reservamos el derecho de modificar estos términos en cualquier momento. Si continúas utilizando nuestros servicios después de un cambio, se entiende que estás de acuerdo con los nuevos términos.

El incumplimiento de estos términos puede resultar en la suspensión o cancelación del acceso sin previo aviso. Es tu responsabilidad mantener la confidencialidad de tu cuenta y notificar cualquier uso no autorizado.
`;

  legalInfo: string = `
Todos los contenidos disponibles en El Chueco —incluyendo textos, gráficos, logotipos, íconos, imágenes, clips de audio, descargas digitales, compilaciones de datos y software— son propiedad de la empresa o sus proveedores de contenido, y están protegidos por las leyes de derechos de autor y propiedad intelectual nacionales e internacionales.

No se permite la reproducción, modificación, distribución o uso del contenido sin autorización previa y por escrito de El Chueco.

La marca, logotipo y elementos distintivos están protegidos legalmente. Su uso sin consentimiento puede dar lugar a acciones legales.

Al utilizar la plataforma, te comprometes a:

- No vulnerar derechos de terceros.
- Cumplir con todas las leyes locales, estatales y nacionales aplicables.
- Respetar las normas internacionales que regulan el uso de software y servicios digitales.
`;

  privacyPolicy: string = `
En El Chueco, tu privacidad es una prioridad.

Recopilamos información personal como:

- Nombre
- Dirección de correo electrónico
- Especialidad profesional
- Actividad dentro de la plataforma

Esto nos permite ofrecer una experiencia personalizada, programar sesiones, y mejorar continuamente los servicios.

Tus datos se utilizan únicamente con fines operativos. No compartimos tu información con terceros salvo por obligación legal o consentimiento explícito.

Adoptamos medidas de seguridad técnicas y organizativas para proteger tus datos contra el acceso no autorizado, la alteración o la destrucción.

Tienes derecho a:

- Acceder a tu información personal
- Solicitar correcciones
- Solicitar la eliminación de tus datos en cualquier momento

Puedes contactarnos mediante nuestros canales oficiales. Al utilizar nuestros servicios, aceptas esta política de privacidad. Te informaremos de cualquier cambio sustancial en esta política antes de aplicarlo.
`;
}
