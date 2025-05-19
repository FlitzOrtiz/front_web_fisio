import { Injectable } from '@angular/core';
// models
import { Graphic } from '../domain/dashboard/graphic';
import { Notificacion } from '../domain/dashboard/notificacion';
import { Session } from '../domain/dashboard/session';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  constructor() {}

  getSessions(): Session[] {
    let sessions: Session[] = [];
    for (let i = 0; i < 5; i++) {
      sessions.push({
        id: i,
        patient_pfp: 'assets/user-ico.png',
        patient_name: 'Walter White',
        patient_routine: 'Rutina de pierna avanzada',
        routine_id: Math.floor(Math.random() * 100),
      });
    }
    return sessions;
  }

  getSessionUrl(routine_id: number): string {
    return '/exercise';
  }

  getNotifications(): Notificacion[] {
    let notifications: Notificacion[] = [];
    for (let i = 0; i < 5; i++) {
      notifications.push({
        id: i,
        date: new Date(Date.now() - Math.floor(Math.random() * 10000000000)),
        sender_name: 'John Doe',
        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      });
      notifications[i].content =
        notifications[i].date?.toLocaleDateString() +
        ' - ' +
        notifications[i].content;
    }
    notifications.sort((b, a) => {
      if (a.date && b.date) return a.date.getTime() - b.date.getTime();
      if (!a.date && b.date) return 1;
      if (a.date && !b.date) return -1;
      return 0;
    });
    return notifications;
  }

  getGraphics(): Graphic[] {
    return [
      {
        id: 1,
        type: 'completed',
        year: 2024,
        src: 'assets/gr-linea-completadas-2024.png',
      },
      {
        id: 2,
        type: 'planned',
        year: 2024,
        src: 'assets/gr-linea-planeadas-2024.png',
      },
      {
        id: 3,
        type: 'completed',
        year: 2025,
        src: 'assets/gr-linea-completadas.png',
      },
      {
        id: 4,
        type: 'planned',
        year: 2025,
        src: 'assets/gr-linea-planeadas.png',
      },
    ];
  }

  getBarGraphic(): Graphic {
    return {
      id: 1,
      type: 'bar',
      src: 'assets/gr-barras-satisfaccion.png',
    };
  }
}
