import { Component, AfterViewInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { FbuttonComponent } from '../../../common/component/fbutton/fbutton.component';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-login-camera',
  standalone: true,
  imports: [FbuttonComponent, NgIf],
  templateUrl: './login-camera.component.html',
  styleUrls: ['./login-camera.component.scss']
})
export class LoginCameraComponent implements AfterViewInit {
  cameraReady = false;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      const videoElement = document.getElementById('login-camera-video') as HTMLVideoElement;

      if (navigator.mediaDevices?.getUserMedia) {
        navigator.mediaDevices.getUserMedia({ video: true })
          .then((stream) => {
            videoElement.srcObject = stream;
            videoElement.onloadedmetadata = () => {
              videoElement.play();
              this.cameraReady = true;
            };
          })
      }
    }
  }
}
