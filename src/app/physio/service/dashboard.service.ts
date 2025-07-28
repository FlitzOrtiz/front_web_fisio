import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map } from 'rxjs';

// models
import { Graphic } from '../domain/dashboard/graphic';
import { BarGraphicData } from '../domain/dashboard/bar-graphic';
import { Notificacion } from '../domain/dashboard/notificacion';
import { Session } from '../domain/dashboard/session';
import { environment } from '../../environment';
import { getFromLocalStorage } from '../../common/utils/localstorage.util';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  private readonly baseUrl = `${environment.apiUrl}/api/dashboard`;

  constructor(private readonly http: HttpClient) {}

  getSessions(): Observable<Session[]> {
    const token = getFromLocalStorage('accessToken');
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
    const token = getFromLocalStorage('accessToken');
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

  // --- ¡MÉTODO getGraphics() REFACTORIZADO CON LA ÚNICA INTERFAZ GRAPHIC! ---
  getGraphics(): Observable<Graphic[]> {
    const token = getFromLocalStorage('accessToken');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });

    return this.http
      .post<any>(
        `${this.baseUrl}/charts`,
        { chartType: 'lineas' }, // Pide al backend solo los gráficos de líneas
        { headers }
      )
      .pipe(
        map((response: any) => {
          const allTransformedGraphics: Graphic[] = [];

          if (!response || !response.charts || response.charts.length === 0) {
            console.warn(
              'No se encontraron gráficos de líneas en la respuesta del backend.'
            );
            return [];
          }

          response.charts.forEach((rawChart: any, index: number) => {
            if (rawChart.type === 'lineas' && rawChart.data) {
              Object.keys(rawChart.data).forEach((yearStr: string) => {
                const year = parseInt(yearStr, 10);
                const monthsData = rawChart.data[yearStr];

                const seriesData: { name: string; value: number }[] = []; // Tipo de array directamente aquí
                Object.keys(monthsData).forEach((monthNum: string) => {
                  const monthName = this.getMonthName(parseInt(monthNum, 10));
                  seriesData.push({
                    name: monthName,
                    value: monthsData[monthNum],
                  });
                });
                seriesData.sort(
                  (a, b) =>
                    this.getMonthNumber(a.name) - this.getMonthNumber(b.name)
                );

                // La serie se construye directamente aquí
                const chartSeries = {
                  name: rawChart.title,
                  series: seriesData,
                };

                let graphicType: 'completed' | 'planned';
                if (rawChart.title === 'Sesiones Completadas') {
                  graphicType = 'completed';
                } else if (rawChart.title === 'Sesiones Creadas') {
                  graphicType = 'planned';
                } else {
                  console.warn(
                    `Título de gráfico desconocido para mapeo: ${rawChart.title}`
                  );
                  return;
                }

                allTransformedGraphics.push({
                  id: index + 1,
                  type: graphicType,
                  year: year,
                  title: rawChart.title,
                  chartData: [chartSeries], // chartData es un array con un objeto de serie
                });
              });
            }
          });
          return allTransformedGraphics;
        })
      );
  }

  private getMonthName(monthNum: number): string {
    const months = [
      'Ene',
      'Feb',
      'Mar',
      'Abr',
      'May',
      'Jun',
      'Jul',
      'Ago',
      'Sep',
      'Oct',
      'Nov',
      'Dic',
    ];
    return months[monthNum - 1] || 'Desconocido';
  }

  private getMonthNumber(monthName: string): number {
    const monthsMap: { [key: string]: number } = {
      Ene: 1,
      Feb: 2,
      Mar: 3,
      Abr: 4,
      May: 5,
      Jun: 6,
      Jul: 7,
      Ago: 8,
      Sep: 9,
      Oct: 10,
      Nov: 11,
      Dic: 12,
    };
    return monthsMap[monthName] || 0;
  }

  getBarGraphic(): Observable<BarGraphicData> {
    const token = getFromLocalStorage('accessToken');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });

    return this.http
      .post<any>(
        `${this.baseUrl}/charts`,
        {
          chartType: 'barras',
        },
        { headers }
      )
      .pipe(
        map((response) => {
          const rawChartData = response.charts[0];

          if (!rawChartData || !rawChartData.data) {
            console.error(
              'La respuesta del backend no contiene los datos esperados para el gráfico de barras.'
            );
            throw new Error('Datos de gráfico no válidos o incompletos.');
          }

          const innerData = rawChartData.data['0'];

          const transformedValues = Object.keys(innerData).map((key) => {
            return {
              label: this.getCategoryLabel(key), // Aquí 'key' será "1", "2", "3" directamente como etiqueta
              value: innerData[key],
            };
          });

          return {
            id: rawChartData.id || Math.random(),
            type: 'barplot',
            title: rawChartData.title,
            values: transformedValues,
          };
        })
      );
  }

  private getCategoryLabel(key: string): string {
    switch (key) {
      case '1':
        return 'Negativo';
      case '2':
        return 'Neutral';
      case '3':
        return 'Positivo';
      default:
        return `Categoría ${key}`;
    }
  }
}
