import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map } from 'rxjs';

// models
import { Graphic } from '../domain/dashboard/graphic';
import { Notificacion } from '../domain/dashboard/notificacion';
import { Session } from '../domain/dashboard/session';
import { environment } from '../../environment';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  private readonly baseUrl = `${environment.apiUrl}/api/dashboard`;

  constructor(private readonly http: HttpClient) {}

  getSessions(): Observable<Session[]> {
    const token = localStorage.getItem('accessToken');

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });

    return this.http.get<any>(`${this.baseUrl}/info`, { headers }).pipe(
      map((response) => {
        if (
          response.ongoingSessions &&
          Array.isArray(response.ongoingSessions)
        ) {
          return response.ongoingSessions.map((session: any) => ({
            id: session.id || Math.random(),
            patient_name: session.patientName,
            patient_pfp:
              session.patientPfpUrl ||
              'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/2048px-Default_pfp.svg.png',
            patient_routine: session.routineName,
            routine_id: session.routineId,
          }));
        }
        return [];
      })
    );
  }

  getSessionUrl(routine_id: number): string {
    return '/exercise';
  }

  getNotifications(): Observable<Notificacion[]> {
    const token = localStorage.getItem('accessToken');

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });

    return this.http.get<any>(`${this.baseUrl}/info`, { headers }).pipe(
      map((response) => {
        if (response.notifications && Array.isArray(response.notifications)) {
          return response.notifications.map((notification: any) => ({
            id: notification.id || Math.random(),
            date: new Date(notification.sentAt),
            sender_name: notification.senderName,
            content: notification.message,
          }));
        }

        return [];
      })
    );
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
