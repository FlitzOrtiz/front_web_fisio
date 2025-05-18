import {
  Component,
  EventEmitter,
  Input,
  Output,
  HostListener,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FbuttonComponent } from '../fbutton/fbutton.component';

interface MenuItem {
  icon: string;
  label: string;
  route: string;
}

@Component({
  selector: 'app-menu-modal',
  standalone: true,
  imports: [CommonModule, RouterModule, FbuttonComponent],
  templateUrl: './menu-modal.component.html',
  styleUrl: './menu-modal.component.scss',
})
export class MenuModalComponent {
  @Input() isOpen: boolean = false;
  @Input() userName: string = 'Jessie Pinkman';
  @Output() close = new EventEmitter<void>();

  dashboards: MenuItem[] = [
    { icon: 'fa-solid fa-chart-pie', label: 'Principal', route: '/dashboard' },
  ];

  pages: MenuItem[] = [
    { icon: 'fa-solid fa-user', label: 'Cuenta', route: '/account' },
    { icon: 'fa-solid fa-list-check', label: 'Rutinas', route: '/routines' },
    { icon: 'fa-solid fa-credit-card', label: 'Cambiar Plan', route: '/plans' },
    { icon: 'fa-solid fa-folder', label: 'Fichas', route: '/files' },
  ];

  @HostListener('document:click', ['$event'])
  onClickOutside(event: MouseEvent) {
    const clickedElement = event.target as HTMLElement;
    const menuButton = document.getElementById('menu-button');

    if (menuButton && menuButton.contains(clickedElement)) {
      return;
    }

    const menuContainer = document.querySelector('.menu-container');
    if (
      this.isOpen &&
      menuContainer &&
      !menuContainer.contains(clickedElement)
    ) {
      this.close.emit();
    }
  }

  stopPropagation(event: MouseEvent) {
    event.stopPropagation();
  }
}
