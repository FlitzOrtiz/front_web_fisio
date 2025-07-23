import {
  Component,
  ElementRef,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'fbutton',
  imports: [CommonModule, RouterModule],
  templateUrl: './fbutton.component.html',
  styleUrl: './fbutton.component.scss',
  standalone: true,
})
export class FbuttonComponent {
  @Input() label: string = '';
  @Input() type: string = 'button';
  @Input() color: string = 'primary';
  @Input() size: 'sm' | 'md' | 'none' | 'lg' = 'md';
  @Input() disabled: boolean = false;
  @Input() classSelected: boolean = false;
  @Input() icon: string = '';
  @Input() iconPosition: string = 'left';
  @Input() iconColor: string = '';
  @Input() isSquare: boolean = false;
  @Input() isTransparent: boolean = false;
  @Input() loading: boolean = false;
  @Input() loadingText: string = '';
  @Input() loadingIcon: string = 'fa-solid fa-spinner';
  @Input() loadingIconPosition: string = 'left';
  @Input() loadingSize: string = 'sm';
  @Input() loadingColor: string = 'primary';
  @Input() loadingDisabled: boolean = false;
  @Input() routeTo: string | null = null;
  @Input() externalLink: string | null = null;
  @Output() onClick = new EventEmitter<any>();

  constructor(private el: ElementRef, private router: Router) {}

  handleClick() {
    if (this.onClick) {
      this.onClick.emit();
    }

    if (this.routeTo) {
      this.router.navigate([this.routeTo]);
    } else if (this.externalLink) {
      window.open(this.externalLink, '_blank');
    }
  }
}
