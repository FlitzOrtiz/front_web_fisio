import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-progress-bar',
  imports: [CommonModule],
  templateUrl: './progress-bar.component.html',
  styleUrl: './progress-bar.component.scss',
})
export class ProgressBarComponent {
  @Input() value: number = 0;
  @Input() maxValue: number = 100;
  @Input() showPercentage: boolean = false;
  @Input() color: string = '';

  get percentage(): number {
    return (this.value / this.maxValue) * 100;
  }

  get progressStyle(): any {
    const style: any = {
      width: `${this.percentage}%`,
    };

    if (this.color) {
      style.backgroundColor = this.color;
    }

    return style;
  }

  get progressColor(): string {
    if (this.color) {
      return this.color;
    }

    if (this.percentage < 30) {
      return '#f44336'; // Rojo
    } else if (this.percentage < 70) {
      return '#ff9800'; // Naranja
    } else {
      return '#4caf50'; // Verde
    }
  }
}
