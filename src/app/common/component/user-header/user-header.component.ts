import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { FbuttonComponent } from '../fbutton/fbutton.component';

@Component({
  selector: 'app-user-header',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, FbuttonComponent],
  templateUrl: './user-header.component.html',
  styleUrl: './user-header.component.scss',
})
export class UserHeaderComponent {
  searchQuery: string = '';

  constructor(private router: Router) {}

  search(): void {
    // Implement your search functionality here
    console.log('Searching for:', this.searchQuery);
  }

  toggleSidebar(): void {
    // Implement sidebar toggle functionality
    console.log('Toggle sidebar');
  }

  openUserMenu(): void {
    // Implement user menu functionality
    console.log('Open user menu');
  }

  openSettings(): void {
    // Implement settings menu functionality
    console.log('Open settings');
  }
}
