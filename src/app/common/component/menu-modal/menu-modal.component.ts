import {
  Component,
  EventEmitter,
  Input,
  Output,
  HostListener,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FbuttonComponent } from '../fbutton/fbutton.component';
import { AuthService } from '../../../auth/service/auth.service';

interface MenuItem {
  icon: string;
  label: string;
  route?: string;
  action?: () => void;
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

  constructor(private authService: AuthService, private router: Router) {}

  dashboards: MenuItem[] = [
    { icon: 'fa-solid fa-chart-pie', label: 'Principal', route: '/dashboard' },
  ];

  pages: MenuItem[] = [
    { icon: 'fa-solid fa-user', label: 'Cuenta', route: '/account' },
    {
      icon: 'fa-solid fa-list-check',
      label: 'Rutinas',
      route: '/routinemanage',
    },
    {
      icon: 'fa-solid fa-credit-card',
      label: 'Cambiar Plan',
      route: '/payment',
    },
    {
      icon: 'fa-solid fa-folder',
      label: 'Fichas',
      route: '/medicalrecordmanage',
    },
    {
      icon: 'fa-solid fa-right-from-bracket',
      label: 'Cerrar Sesión',
      action: () => this.handleLogout()
    },
  ];

  handleLogout(): void {
    this.authService.logout().subscribe({
      next: () => {
        this.closeModalAndRedirect();
      },
      error: (err) => {
        console.error('Error al cerrar sesión:', err);
        // Forzar cierre de sesión local si falla el servidor
        this.closeModalAndRedirect();
      }
    });
  }

  closeModalAndRedirect(): void {
    this.close.emit();
    this.router.navigate(['/landing']);
  }

  onMenuItemClick(item: MenuItem): void {
    if (item.action) {
      item.action();
    }
    this.close.emit();
  }

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