import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { FbuttonComponent } from '../fbutton/fbutton.component';
import { MenuModalComponent } from '../menu-modal/menu-modal.component';

@Component({
  selector: 'app-user-header',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    FbuttonComponent,
    MenuModalComponent,
  ],
  templateUrl: './user-header.component.html',
  styleUrl: './user-header.component.scss',
})
export class UserHeaderComponent {
  searchQuery: string = '';
  isMenuOpen: boolean = false;

  constructor(private router: Router) {}

  search(): void {
    // Implement your search functionality here
    console.log('Searching for:', this.searchQuery);
  }

  toggleSidebar(): void {
    this.isMenuOpen = !this.isMenuOpen;
    console.log('Menu open:', this.isMenuOpen);
  }

  closeMenu(): void {
    this.isMenuOpen = false;
  }

  openUserMenu(): void {
    this.router.navigate(['account']);
  }

  openSettings(): void {
    // Implement settings menu functionality
    console.log('Open settings');
  }
}
