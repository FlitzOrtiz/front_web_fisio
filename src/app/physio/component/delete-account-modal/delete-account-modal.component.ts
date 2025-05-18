import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-delete-account-modal',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './delete-account-modal.component.html',
  styleUrls: ['./delete-account-modal.component.scss']
})
export class DeleteAccountModalComponent {
  @Output() close = new EventEmitter<void>();

  email = '';
  password = '';
  confirmation = '';
  showPassword = false;

  constructor(private router: Router) {}

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  closeModal() {
    this.close.emit();
  }

  deleteAccount() {
    if (this.confirmation === 'ELIMINAR MI CUENTA') {
      this.router.navigate(['/landing']);
      this.close.emit();
    }
  }
}
