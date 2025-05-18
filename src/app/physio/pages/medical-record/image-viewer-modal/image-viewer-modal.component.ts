import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PhotosExercise } from '../../../domain/routine';

@Component({
  selector: 'app-image-viewer-modal',
  imports: [CommonModule],
  templateUrl: './image-viewer-modal.component.html',
  styleUrl: './image-viewer-modal.component.scss',
})
export class ImageViewerModalComponent {
  @Input() show: boolean = false;
  @Input() image: PhotosExercise | null = null;
  @Input() images: PhotosExercise[] = [];

  @Output() close = new EventEmitter<void>();

  currentIndex: number = 0;
  isZoomed: boolean = false;

  ngOnChanges(): void {
    if (this.image && this.images.length > 0) {
      this.currentIndex = this.images.findIndex(
        (img) => img.id === this.image?.id
      );
      if (this.currentIndex < 0) this.currentIndex = 0;
    }
  }

  closeViewer(): void {
    this.isZoomed = false;
    this.close.emit();
  }

  nextImage(): void {
    if (this.images.length > 1) {
      this.currentIndex = (this.currentIndex + 1) % this.images.length;
      this.image = this.images[this.currentIndex];
    }
  }

  prevImage(): void {
    if (this.images.length > 1) {
      this.currentIndex =
        (this.currentIndex - 1 + this.images.length) % this.images.length;
      this.image = this.images[this.currentIndex];
    }
  }

  toggleZoom(): void {
    this.isZoomed = !this.isZoomed;
  }

  handleKeydown(event: KeyboardEvent): void {
    if (!this.show) return;

    switch (event.key) {
      case 'Escape':
        this.closeViewer();
        break;
      case 'ArrowRight':
        this.nextImage();
        break;
      case 'ArrowLeft':
        this.prevImage();
        break;
      case ' ':
        this.toggleZoom();
        event.preventDefault();
        break;
    }
  }
}
