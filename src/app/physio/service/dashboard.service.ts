import { Injectable } from '@angular/core';
// models
import { Graphic } from '../domain/dashboard/graphic';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  constructor() {}

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
}
