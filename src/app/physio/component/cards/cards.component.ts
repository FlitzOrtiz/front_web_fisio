import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardHeaderComponent } from '../card-header/card-header.component';
import { NotificationComponent } from '../notification/notification.component';
import { SessionComponent } from '../session/session.component';
import { GraphicsComponent } from '../graphics/graphics.component';
import { FbuttonComponent } from '../../../common/component/fbutton/fbutton.component';
import { DashboardModalComponent } from '../dashboard-modal/dashboard-modal.component';
// models
import { Session } from '../../domain/dashboard/session';
import { Notificacion } from '../../domain/dashboard/notificacion';
import { Graphic } from '../../domain/dashboard/graphic';
// services
import { DashboardService } from '../../service/dashboard.service';

@Component({
  selector: 'cards',
  standalone: true,
  imports: [
    CommonModule,
    CardHeaderComponent,
    NotificationComponent,
    SessionComponent,
    GraphicsComponent,
    FbuttonComponent,
    DashboardModalComponent,
  ],
  templateUrl: './cards.component.html',
  styleUrl: './cards.component.scss',
})
export class CardsComponent implements OnInit {
  @Input() title: string = '';
  @Input() icon: string = '';
  @Input() visible: boolean = true;
  @Output() close = new EventEmitter<void>();

  showCurrentSessions = true;
  showRoutineSummary = true;
  showPatientSatisfaction = true;
  showNotifications = true;
  showModal = false;

  currentSessions: Session[] = [];
  notifications: Notificacion[] = [];
  barGraphic: Graphic | null = null;

  _dashboardService: DashboardService = new DashboardService();

  constructor() {
    this.ngOnInit();
  }

  ngOnInit(): void {
    this.currentSessions = this._dashboardService.getSessions();
    this.notifications = this._dashboardService.getNotifications();
    this.barGraphic = this._dashboardService.getBarGraphic();
  }

  getUrl(routine_id: number): string {
    return this._dashboardService.getSessionUrl(routine_id);
  }

  get showColumn() {
    return this.showRoutineSummary || this.showPatientSatisfaction;
  }

  onOptionSelected(option: string) {
    switch (option) {
      case 'Sesiones Activas':
        this.showCurrentSessions = !this.showCurrentSessions;
        break;
      case 'Resumen Rutinas':
        this.showRoutineSummary = !this.showRoutineSummary;
        break;
      case 'Satisfacción':
        this.showPatientSatisfaction = !this.showPatientSatisfaction;
        break;
      case 'Notificaciones':
        this.showNotifications = !this.showNotifications;
        break;
    }
    this.showModal = false;
  }
}
