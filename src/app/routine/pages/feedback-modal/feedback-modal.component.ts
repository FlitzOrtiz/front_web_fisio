import { Component, EventEmitter, Output } from '@angular/core';
import { FbuttonComponent } from "../../../common/component/fbutton/fbutton.component";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-feedback-modal',
  templateUrl: './feedback-modal.component.html',
  styleUrls: ['./feedback-modal.component.scss'],
  standalone: true,
  imports: [FbuttonComponent,CommonModule, FormsModule],
})
export class FeedbackModalComponent {
  rating: number = 0;
  feedbackText: string = '';

  @Output() close = new EventEmitter<void>();

  closeModal() {
    this.close.emit();
  }

  setRating(star: number) {
    this.rating = star;
  }

  submitFeedback() {
    const feedbackData = {
      rating: this.rating,
      comment: this.feedbackText,
      timestamp: new Date(),
    };

    console.log('Feedback enviado:', feedbackData);

    // Aquí puedes llamar a un servicio para enviar al backend
    // this.feedbackService.save(feedbackData).subscribe(...);

    this.closeModal(); // Cerrar el modal después de enviar
  }
}
