import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DeleteAccountModalComponent } from '../delete-account-modal/delete-account-modal.component';
import { UserService } from '../../service/user.service';

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

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.getCachedAccount().subscribe({
      next: (resp) => {
        console.log('User data:', resp.data);
        this.userName = resp.data.fullName || '';
        this.userNickname = resp.data.username || '';
        this.profileImage =
          resp.data.profilePhoto ||
          'https://i.pinimg.com/736x/e9/ea/ba/e9eabad5f189d26b31f77a03570ffea7.jpg';
      },
      error: () => {
        this.profileImage =
          'https://i.pinimg.com/736x/e9/ea/ba/e9eabad5f189d26b31f77a03570ffea7.jpg';
      },
    });
    // Si quieres que se actualice en caliente, puedes suscribirte a un observable global aquí
  }

  openDeleteModal() {
    this.showDeleteModal = true;
  }

  closeDeleteModal() {
    this.showDeleteModal = false;
  }
}
