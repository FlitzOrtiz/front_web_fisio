import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardHeaderComponent } from '../card-header/card-header.component';
import { NotificationComponent } from '../notification/notification.component';
import { SessionComponent } from '../session/session.component';
import { GraphicsComponent } from '../graphics/graphics.component';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [
    CommonModule,
    CardHeaderComponent,
    NotificationComponent,
    SessionComponent,
    GraphicsComponent,
  ],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
})
export class CardComponent {
  showCurrentSessions = true;
  showRoutineSummary = true;
  showPatientSatisfaction = true;
  showNotifications = true;

  get showColumn() {
    return this.showRoutineSummary || this.showPatientSatisfaction;
  }
}
