import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { FbuttonComponent } from '../fbutton/fbutton.component';
import { MenuModalComponent } from '../menu-modal/menu-modal.component';
import { UserService } from '../../../physio/service/user.service';

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
export class UserHeaderComponent implements OnInit {
  searchQuery: string = '';
  isMenuOpen: boolean = false;
  profilePhoto: string = 'assets/user-ico.png';

  constructor(private router: Router, private UserService: UserService) {}

  ngOnInit() {
    this.UserService.getCachedAccount().subscribe({
      next: (user) => {
        console.log('User data:', user);
        this.profilePhoto = user.profilePhoto || 'assets/user-ico.png';
      },
      error: () => {
        this.profilePhoto = 'assets/user-ico.png';
      },
    });
  }

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
