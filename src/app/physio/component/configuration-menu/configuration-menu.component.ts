import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-configuration-menu',
  imports: [CommonModule,RouterModule],
  templateUrl: './configuration-menu.component.html',
  styleUrls: ['./configuration-menu.component.scss']
})
export class ConfigurationMenuComponent {
  userName = 'Jessie Brown';
  userNickname = 'Jessie';
  profileImage = 'https://i.pinimg.com/736x/e9/ea/ba/e9eabad5f189d26b31f77a03570ffea7.jpg';
}
