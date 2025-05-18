import { ExerciseMetrics, PhotosExercise } from '../../../domain/routine';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { FbuttonComponent } from '../../../../common/component/fbutton/fbutton.component';
import { ProgressBarComponent } from '../../../../common/component/progress-bar/progress-bar.component';
import { ImageViewerModalComponent } from '../image-viewer-modal/image-viewer-modal.component';

@Component({
  selector: 'app-result-details-modal',
  imports: [
    CommonModule,
    FormsModule,
    FbuttonComponent,
    ProgressBarComponent,
    ImageViewerModalComponent,
  ],
  templateUrl: './result-details-modal.component.html',
  styleUrl: './result-details-modal.component.scss',
})
export class ResultDetailsModalComponent {
  @Input() show: boolean = false;
  @Input() routineId: number = 0;
  @Input() routineName: string = '';

  @Output() close = new EventEmitter<void>();
  @Output() save = new EventEmitter<any>();
  @Output() viewImage = new EventEmitter<PhotosExercise>();

  activeTab: 'metrics' | 'photos' = 'metrics';

  // Datos del formulario
  resultDate: string = '';
  resultTime: string = '';
  resultDuration: string = '';
  patientComments: string = '';

  showImageViewer: boolean = false;
  selectedImage: PhotosExercise | null = null;
  // Métricas y fotos
  exerciseMetrics: ExerciseMetrics[] = [
    {
      exerciseId: 1,
      valueEvaluated: 10,
    },
    {
      exerciseId: 2,
      valueEvaluated: 20,
    },
  ];

  exercisePhotos: PhotosExercise[] = [
    {
      id: 1,
      photoUrl: 'https://example.com/photo1.jpg',
      videoTimestamp: 0,
      description: 'Foto 1',
    },
    {
      id: 2,
      photoUrl: 'https://example.com/photo2.jpg',
      videoTimestamp: 0,
      description: 'Foto 2',
    },
    {
      id: 3,
      photoUrl: 'https://example.com/photo3.jpg',
      videoTimestamp: 0,
      description: 'Foto 3',
    },
    {
      id: 4,
      photoUrl: 'https://example.com/photo4.jpg',
      videoTimestamp: 0,
      description: 'Foto 4',
    },
    {
      id: 5,
      photoUrl: 'https://example.com/photo5.jpg',
      videoTimestamp: 0,
      description: 'Foto 5',
    },
  ];

  constructor() {
    // Inicializar fecha y hora actuales
    const now = new Date();
    this.resultDate = now.toISOString().split('T')[0];
    this.resultTime = now.toTimeString().substring(0, 5);
    this.resultDuration = '00:20:00';
  }

  closeModal(): void {
    this.close.emit();
  }

  saveResult(): void {
    const result = {
      routineId: this.routineId,
      date: this.resultDate,
      time: this.resultTime,
      duration: this.resultDuration,
      metrics: this.exerciseMetrics,
      comments: this.patientComments,
      photos: this.exercisePhotos,
    };

    this.save.emit(result);
  }

  openImageViewer(photo: PhotosExercise): void {
    this.viewImage.emit(photo);
  }

  // Métodos para manejar métricas
  // addMetric(): void {
  //   this.exerciseMetrics.push({
  //     exerciseId: Date.now(),
  //     valueEvaluated: 0,
  //   });
  // }

  removeMetric(index: number): void {
    this.exerciseMetrics.splice(index, 1);
  }

  // updateMetricValue(index: number, event: Event): void {
  //   const value = parseInt((event.target as HTMLInputElement).value);
  //   this.exerciseMetrics[index].value = value;
  //   this.exerciseMetrics[index].percentage = (value / this.exerciseMetrics[index].maxValue) * 100;
  // }

  // Métodos para manejar fotos
  // uploadPhoto(event: Event): void {
  //   const files = (event.target as HTMLInputElement).files;
  //   if (files && files.length > 0) {
  //     // En una aplicación real, aquí se subiría la imagen al servidor
  //     // Para este ejemplo, simulamos la carga con un placeholder
  //     const newPhoto: PhotosExercise = {
  //       id: Date.now(),
  //       photoUrl: URL.createObjectURL(files[0]),
  //       videoTimestamp: 0, // Aquí se podría establecer el timestamp del video
  //       description: 'Descripción de la foto'
  //     };

  //     this.exercisePhotos.push(newPhoto);
  //   }
  // }

  removePhoto(index: number): void {
    this.exercisePhotos.splice(index, 1);
  }

  updatePhotoDescription(index: number, event: Event): void {
    this.exercisePhotos[index].description = (
      event.target as HTMLInputElement
    ).value;
  }

  closeImageViewer(): void {
    this.showImageViewer = false;
    this.selectedImage = null;
  }
}
