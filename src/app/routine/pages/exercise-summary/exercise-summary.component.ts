import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FbuttonComponent } from "../../../common/component/fbutton/fbutton.component";
import { OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeedbackModalComponent } from "../feedback-modal/feedback-modal.component";

@Component({
  selector: 'app-exercise-summary',
  imports: [CommonModule, FbuttonComponent, FeedbackModalComponent],
  templateUrl: './exercise-summary.component.html',
  styleUrls: ['./exercise-summary.component.scss'],
  standalone: true
})
export class ExerciseSummaryComponent implements OnInit {
  modalActivo = false;
  exercises = [
    {
      title: 'Movilidad de hombro',
      metrics: { precision: 85, posture: 72, speed: 20 }
    },
    {
      title: 'Flexión de dedos',
      metrics: { precision: 78, posture: 88, speed: 30 }
    },
    {
      title: 'Elevación de brazo',
      metrics: { precision: 90, posture: 70, speed: 25 }
    }
  ];

  averagePrecision: number = 0;
  averagePosture: number = 0;
  averageSpeed: number = 0;
  generalScore: number = 0;

  resumen: { title: string; avg: number }[] = [];

  recomendaciones: string[] = [
    'Mantén una postura correcta durante todos los ejercicios.',
    'Realiza los movimientos de forma más lenta y controlada.',
    'Recuerda respirar adecuadamente durante cada ejercicio.',
    'Completa todas las repeticiones recomendadas por tu fisio.'
  ];

  ngOnInit() {
    this.calculateAverages();
  }

  calculateAverages() {
    const total = this.exercises.length;

    const precisionSum = this.exercises.reduce((sum, ex) => sum + ex.metrics.precision, 0);
    const postureSum = this.exercises.reduce((sum, ex) => sum + ex.metrics.posture, 0);
    const speedSum = this.exercises.reduce((sum, ex) => sum + ex.metrics.speed, 0);

    this.averagePrecision = Math.round(precisionSum / total);
    this.averagePosture = Math.round(postureSum / total);
    this.averageSpeed = Math.round(speedSum / total);

    this.resumen = this.exercises.map((ex) => {
      const avg = Math.round(
        (ex.metrics.precision + ex.metrics.posture + ex.metrics.speed) / 3
      );
      return { title: ex.title, avg };
    });

    const totalAvgSum = this.resumen.reduce((sum, res) => sum + res.avg, 0);
    this.generalScore = Math.round(totalAvgSum / this.resumen.length);
  }

  getColor(value: number): string {
    if (value >= 80) return 'green';
    if (value >= 40) return 'orange';
    return 'red';
  }

  
}
