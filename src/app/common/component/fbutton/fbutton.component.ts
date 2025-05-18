import { Component, ElementRef, Input } from '@angular/core';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'fbutton',
  imports: [CommonModule, RouterModule],
  templateUrl: './fbutton.component.html',
  styleUrl: './fbutton.component.scss',
  standalone: true
})
export class FbuttonComponent {
  @Input() label: string = '';
  @Input() type: string = 'button';
  @Input() color: string = 'primary';
  @Input() size: string = 'md';
  @Input() disabled: boolean = false;
  @Input() icon: string = '';
  @Input() iconPosition: string = 'left';
  @Input() loading: boolean = false;
  @Input() loadingText: string = '';
  @Input() loadingIcon: string = 'fa-solid fa-spinner';
  @Input() loadingIconPosition: string = 'left';
  @Input() loadingSize: string = 'sm';
  @Input() loadingColor: string = 'primary';
  @Input() loadingDisabled: boolean = false;
  @Input() routeTo: string | null = null;
  @Input() onClick: (() => void) | null = null;

  constructor(private el: ElementRef, private router: Router) {}

  handleClick() {
    if (this.onClick) {
      this.onClick();
    }

    if (this.routeTo) {
      this.router.navigate([this.routeTo]);
    }
  }
}
