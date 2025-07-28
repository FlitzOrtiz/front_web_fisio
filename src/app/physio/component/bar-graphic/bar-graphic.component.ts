import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxChartsModule } from '@swimlane/ngx-charts';

import { DashboardService } from '../../service/dashboard.service';
import { BarGraphicData } from '../../domain/dashboard/bar-graphic';

@Component({
  selector: 'app-bar-graphic',
  standalone: true,
  imports: [CommonModule, NgxChartsModule],
  templateUrl: './bar-graphic.component.html',
  styleUrl: './bar-graphic.component.scss',
  providers: [DashboardService],
})
export class BarGraphicComponent implements OnInit {
  barChartData: { name: string; value: number }[] = [];
  chartTitle: string = '';
  dataLoaded: boolean = false;

  // --- ¡NUEVA PROPIEDAD DE CONTROL AQUÍ! ---
  showChartTitle: boolean = false; // Establecemos esta propiedad a 'false' para ocultar el título por defecto
  // --- FIN DE NUEVA PROPIEDAD ---

  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = false;
  showXAxisLabel = true;
  xAxisLabel = 'Sentimiento del Usuario';
  showYAxisLabel = false; // Para ocultar la etiqueta del eje Y
  yAxisLabel = '';
  animations = true;
  scheme = 'vivid';

  constructor(private _dashboardService: DashboardService) {}

  ngOnInit(): void {
    this._dashboardService.getBarGraphic().subscribe({
      next: (graphic: BarGraphicData) => {
        // Aunque asignemos el título, su visibilidad ahora depende de showChartTitle
        this.chartTitle = graphic.title;
        this.barChartData = graphic.values.map((item) => ({
          name: item.label,
          value: item.value,
        }));
        this.dataLoaded = true;
        console.log(
          'Datos del gráfico de barras para ngx-charts (desde backend):',
          this.barChartData
        );
      },
      error: (err) => {
        console.error(
          'Error al obtener los datos del gráfico de barras desde el backend:',
          err
        );
        this.dataLoaded = true;
        this.barChartData = [];
      },
    });
  }
}
