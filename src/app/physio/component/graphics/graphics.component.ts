import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { FbuttonComponent } from '../../../common/component/fbutton/fbutton.component';
import { FormsModule } from '@angular/forms';

import { Graphic } from '../../domain/dashboard/graphic';
import { DashboardService } from '../../service/dashboard.service';

@Component({
  selector: 'graphics',
  imports: [CommonModule, FbuttonComponent, NgxChartsModule, FormsModule],
  standalone: true,
  templateUrl: './graphics.component.html',
  styleUrl: './graphics.component.scss',
})
export class GraphicsComponent implements OnInit {
  allGraphics: Graphic[] = [];
  selectedGraphicData: {
    name: string;
    series: { name: string; value: number }[];
  }[] = [];
  currentGraphicTitle: string = '';

  years: number[] = [];
  selectedYear: number | null = null;
  selectedType: 'completed' | 'planned' = 'completed';

  lineChartXAxisLabel: string = 'Mes';
  lineChartYAxisLabel: string = '';
  // --- CAMBIO CLAVE AQUÍ: Color para la línea Morado Claro ---
  colorScheme: any = {
    domain: ['#C7B4FF'], // Un tono de morado claro. Puedes ajustarlo a tu gusto.
  };
  // --- FIN CAMBIO CLAVE ---
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = false;
  showXAxisLabel = true;
  showYAxisLabel = false;
  autoScale = true;

  constructor(private _dashboardService: DashboardService) {}

  ngOnInit(): void {
    this._dashboardService.getGraphics().subscribe({
      next: (graphics: Graphic[]) => {
        this.allGraphics = graphics;
        this.extractAndSetYears();
        if (!this.selectedYear && this.years.length > 0) {
          this.selectedYear = this.years[0]; // Corrección aquí: era this.years()
        }
        this.displaySelectedGraphic();
      },
      error: (err) => {
        console.error('Error al cargar todos los gráficos:', err);
        this.allGraphics = [];
        this.selectedGraphicData = [];
        this.currentGraphicTitle = 'Error al cargar los gráficos.';
      },
    });
  }

  extractAndSetYears(): void {
    const uniqueYears = new Set<number>();
    this.allGraphics.forEach((graphic) => {
      if (graphic.year) {
        uniqueYears.add(graphic.year);
      }
    });
    this.years = Array.from(uniqueYears).sort((a, b) => b - a);
  }

  selectType(type: 'completed' | 'planned'): void {
    this.selectedType = type;
    this.displaySelectedGraphic();
  }

  selectYear(event: Event): void {
    this.selectedYear = Number((event.target as HTMLSelectElement).value);
    this.displaySelectedGraphic();
  }

  displaySelectedGraphic(): void {
    if (!this.selectedType || !this.selectedYear) {
      this.selectedGraphicData = [];
      this.currentGraphicTitle = 'Seleccione un tipo y año.';
      return;
    }

    const foundGraphic = this.allGraphics.find(
      (g) => g.type === this.selectedType && g.year === this.selectedYear
    );

    if (foundGraphic) {
      this.selectedGraphicData = foundGraphic.chartData;
      this.currentGraphicTitle = foundGraphic.title;
    } else {
      this.selectedGraphicData = [];
      this.currentGraphicTitle =
        'Gráfico no disponible para la selección actual.';
    }
  }
}
