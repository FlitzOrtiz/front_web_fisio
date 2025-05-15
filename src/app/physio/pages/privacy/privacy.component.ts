import { Component } from '@angular/core';
import { ConfigurationMenuComponent } from "../../component/configuration-menu/configuration-menu.component";
import { UserHeaderComponent } from "../../../common/component/user-header/user-header.component";

@Component({
  selector: 'app-privacy',
  templateUrl: './privacy.component.html',
  styleUrls: ['./privacy.component.scss'],
  standalone: true,
  imports: [ConfigurationMenuComponent, UserHeaderComponent],
})
export class PrivacyComponent {
  cameraPermission = false;
  notificationsEnabled = false;
  profilePhotoVisible = true;

  toggleCamera() {
    this.cameraPermission = !this.cameraPermission;
  }

  toggleNotifications() {
    this.notificationsEnabled = !this.notificationsEnabled;
  }

  togglePhotoVisibility() {
    this.profilePhotoVisible = !this.profilePhotoVisible;
  }
}

