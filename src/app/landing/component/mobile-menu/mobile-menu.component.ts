import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FbuttonComponent } from '../../../common/component/fbutton/fbutton.component';

@Component({
  selector: 'app-mobile-menu',
  standalone: true,
  imports: [CommonModule, FbuttonComponent],
  templateUrl: './mobile-menu.component.html',
  styleUrl: './mobile-menu.component.scss',
})
export class MobileMenuComponent {
  @Input() isOpen: boolean = false;
  @Output() close = new EventEmitter<void>();
  @Output() menuItemClick = new EventEmitter<string>();

  scrollTo(id: string) {
    this.menuItemClick.emit(id);
  }

  closeMenu() {
    this.close.emit();
  }
}
