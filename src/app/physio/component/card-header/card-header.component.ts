import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FbuttonComponent } from '../../../common/component/fbutton/fbutton.component';

@Component({
  selector: 'card-header',
  standalone: true,
  imports: [CommonModule, FbuttonComponent],
  templateUrl: './card-header.component.html',
  styleUrl: './card-header.component.scss',
})
export class CardHeaderComponent {
  @Input() title: string = '';
  @Input() icon?: string;
  @Output() close = new EventEmitter<void>();

  onClose() {
    this.close.emit();
  }
}
