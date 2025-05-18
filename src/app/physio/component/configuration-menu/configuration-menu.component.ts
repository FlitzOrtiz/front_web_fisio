import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DeleteAccountModalComponent } from '../delete-account-modal/delete-account-modal.component';

@Component({
  selector: 'app-configuration-menu',
  standalone: true,
  imports: [CommonModule, RouterModule, DeleteAccountModalComponent],
  templateUrl: './configuration-menu.component.html',
  styleUrls: ['./configuration-menu.component.scss']
})

export class ConfigurationMenuComponent {
  userName = 'Jessie Brown';
  userNickname = 'Jessie';
  profileImage = 'https://i.pinimg.com/736x/e9/ea/ba/e9eabad5f189d26b31f77a03570ffea7.jpg';
  showDeleteModal = false;

  openDeleteModal() {
    this.showDeleteModal = true;
  }

  closeDeleteModal() {
    this.showDeleteModal = false;
  }
}
