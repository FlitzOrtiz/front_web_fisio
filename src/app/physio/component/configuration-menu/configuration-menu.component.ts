import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DeleteAccountModalComponent } from '../delete-account-modal/delete-account-modal.component';

@Component({
  selector: 'app-configuration-menu',
  standalone: true,
  imports: [CommonModule, RouterModule, DeleteAccountModalComponent],
  templateUrl: './configuration-menu.component.html',
  styleUrls: ['./configuration-menu.component.scss'],
})
export class ConfigurationMenuComponent implements OnInit {
  userName: string = '';
  userNickname: string = '';
  profileImage: string =
    'https://i.pinimg.com/736x/e9/ea/ba/e9eabad5f189d26b31f77a03570ffea7.jpg';
  showDeleteModal: boolean = false;

  ngOnInit(): void {
    const userData = localStorage.getItem('user');
    if (userData) {
      const user = JSON.parse(userData);
      this.userName = user.fullName || '';
      this.userNickname = user.username || '';
    }
  }

  openDeleteModal() {
    this.showDeleteModal = true;
  }

  closeDeleteModal() {
    this.showDeleteModal = false;
  }
}
