import { Component, OnInit } from '@angular/core';
import { FbuttonComponent } from '../../../common/component/fbutton/fbutton.component';
import { FdropdownComponent } from '../../../common/component/fdropdown/fdropdown.component';
import { CommonModule } from '@angular/common';
// models
import { Graphic } from '../../domain/dashboard/graphic';
// services
import { DashboardService } from '../../service/dashboard.service';

@Component({
  selector: 'graphics',
  imports: [CommonModule, FbuttonComponent, FdropdownComponent],
  standalone: true,
  templateUrl: './graphics.component.html',
  styleUrl: './graphics.component.scss',
})
export class GraphicsComponent implements OnInit {
  defaultGraphic: Graphic = {
    id: 0,
    type: 'completed',
    year: 0,
    src: 'https://w7.pngwing.com/pngs/395/283/png-transparent-empty-set-null-set-null-sign-mathematics-mathematics-angle-logo-number.png',
  };

  graphics: Graphic[] = [];
  selectedGraphic: Graphic = this.defaultGraphic;

  years: number[] = [];
  selectedYear: number | null = null;

  selectedType: string | null = null;

  _dashboardService: DashboardService;

  constructor() {
    this._dashboardService = new DashboardService();
  }

  ngOnInit(): void {
    this.graphics = this._dashboardService.getGraphics();
    console.log(this.graphics);
    this.selectedType = this.graphics[0]?.type;
    this.getYears();
    this.updateSelectedGraphic();
  }

  getYears(): void {
    for (let i = 0; i < this.graphics.length; i++) {
      console.log(this.graphics[i]);
      const year = this.graphics[i].year;
      if (year && !this.years.includes(year)) {
        this.years.push(year);
      }
    }
    console.log(this.years);
    this.selectedYear = this.years[0];
  }

  selectType(type: string): void {
    this.selectedType = type;
    this.updateSelectedGraphic();
  }

  selectYear(year: number): void {
    this.selectedYear = year;
    console.log(this.selectedYear);
    this.updateSelectedGraphic();
  }

  updateSelectedGraphic(): void {
    this.selectedGraphic =
      this.graphics.find(
        (g) => g.type === this.selectedType && g.year === this.selectedYear
      ) || this.defaultGraphic;

    console.log(this.selectedGraphic);
  }
}
