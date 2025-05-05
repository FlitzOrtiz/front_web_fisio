import { Component, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FbuttonComponent } from '../../../common/component/fbutton/fbutton.component';

@Component({
  selector: 'app-login-camera',
  standalone: true,
  imports: [CommonModule, FbuttonComponent],
  templateUrl: './login-camera.component.html',
  styleUrls: ['./login-camera.component.scss']
})
export class LoginCameraComponent implements AfterViewInit {

  ngAfterViewInit(): void {
    this.startCamera();
  }

  async startCamera(): Promise<void> {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      const video = document.getElementById('login-camera-video') as HTMLVideoElement;
      if (video) {
        video.srcObject = stream;
        video.play();
      }
    } catch (error) {
      alert('Error: No se pudo acceder a la cámara. Por favor, permite el acceso para continuar.');
    }
  }
}
