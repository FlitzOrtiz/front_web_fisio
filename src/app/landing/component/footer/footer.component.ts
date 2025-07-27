import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
})
export class FooterComponent {
  userEmail: string = '';

  getFormUrl(): string {
    const baseUrl = 'https://docs.google.com/forms/d/e/1FAIpQLSeaKNNZtsHqXKC-yxD2kSDilFtL9__QMA6NYoyhfy6QUYrMJA/viewform';
    const entryParam = 'entry.1618860121';
    return `${baseUrl}?usp=pp_url&${entryParam}=${encodeURIComponent(this.userEmail)}`;
  }
}
