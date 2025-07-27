import { CommonModule } from '@angular/common';
import {
  Component,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import * as poseDetection from '@tensorflow-models/pose-detection';
import * as tf from '@tensorflow/tfjs';
import '@tensorflow/tfjs-backend-webgl';

@Component({
  selector: 'app-pose-detection',
  templateUrl: './pose-detection.component.html',
  imports: [CommonModule],
  styleUrls: ['./pose-detection.component.scss'],
})
export class PoseDetectionComponent implements OnInit, OnDestroy {
  @Input() exerciseName?: string;
  @Input() onValidation?: (
    isCorrect: boolean,
    confidence: number,
    feedback: string
  ) => void;

  @ViewChild('video') videoRef!: ElementRef<HTMLVideoElement>;
  @ViewChild('canvas') canvasRef!: ElementRef<HTMLCanvasElement>;

  feedback = { isCorrect: false, confidence: 0, message: 'Inicializando...' };
  isLoading = true;

  private isMounted = true;
  private animationId: number | undefined;

  async ngOnInit() {
    await this.init();
  }

  ngOnDestroy() {
    this.isMounted = false;
    if (this.animationId) cancelAnimationFrame(this.animationId);

    const tracks = this.videoRef?.nativeElement?.srcObject as MediaStream;
    if (tracks) tracks.getTracks().forEach((track) => track.stop());
  }

  private async init() {
    if (!(await this.initTensorFlow())) return;
    if (!(await this.initCamera())) return;
    const detector = await this.createDetector();
    if (!detector) return;
    await this.runDetection(detector);
  }

  private async initTensorFlow(): Promise<boolean> {
    try {
      this.feedback = {
        isCorrect: false,
        confidence: 0,
        message: 'Configurando TensorFlow...',
      };
      await tf.setBackend('webgl');
      await tf.ready();
      return true;
    } catch {
      this.feedback = {
        isCorrect: false,
        confidence: 0,
        message: 'Error en TensorFlow',
      };
      return false;
    }
  }

  private async initCamera(): Promise<boolean> {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { width: 640, height: 480, facingMode: 'user' },
      });

      const video = this.videoRef.nativeElement;
      video.srcObject = stream;

      await new Promise<void>((resolve, reject) => {
        video.oncanplay = () => resolve();
        video.onerror = (err) => reject(err);
        video.play().catch(reject);
      });

      const canvas = this.canvasRef.nativeElement;
      canvas.width = 640;
      canvas.height = 480;

      return true;
    } catch {
      this.feedback = {
        isCorrect: false,
        confidence: 0,
        message: 'No se puede acceder a la cámara',
      };
      return false;
    }
  }

  private async createDetector(): Promise<any> {
    try {
      this.feedback = {
        isCorrect: false,
        confidence: 0,
        message: 'Cargando modelo de detección...',
      };
      const detector = await poseDetection.createDetector(
        poseDetection.SupportedModels.MoveNet,
        { modelType: poseDetection.movenet.modelType.SINGLEPOSE_LIGHTNING }
      );
      this.feedback = {
        isCorrect: false,
        confidence: 0,
        message: '¡Listo! Comienza el ejercicio',
      };
      this.isLoading = false;
      return detector;
    } catch {
      this.feedback = {
        isCorrect: false,
        confidence: 0,
        message: 'Error cargando modelo',
      };
      return null;
    }
  }

  private async runDetection(detector: any) {
    const detect = async () => {
      const video = this.videoRef.nativeElement;
      if (!this.isMounted || video.readyState < 2) {
        this.animationId = requestAnimationFrame(detect);
        return;
      }

      try {
        const poses = await detector.estimatePoses(video);
        this.draw(poses);

        if (this.exerciseName && poses.length > 0) {
          const validation = this.validateExercise(this.exerciseName, poses[0]);
          this.feedback = validation;
          if (this.onValidation) {
            this.onValidation(
              validation.isCorrect,
              validation.confidence,
              validation.message
            );
          }
        }
      } catch (err) {
        console.error('Detection error', err);
      }

      this.animationId = requestAnimationFrame(detect);
    };

    detect();
  }

  private validateExercise(exercise: string, pose: any) {
    return {
      isCorrect: true,
      confidence: 0.8,
      message: 'Ejercicio detectado correctamente',
    };
  }

  private draw(poses: any[]) {
    const ctx = this.canvasRef.nativeElement.getContext('2d');
    if (!ctx || !this.videoRef || !this.canvasRef) return;

    ctx.clearRect(0, 0, 640, 480);
    for (const pose of poses) {
      for (const keypoint of pose.keypoints) {
        if (keypoint.score > 0.3) {
          ctx.beginPath();
          ctx.arc(keypoint.x, keypoint.y, 5, 0, 2 * Math.PI);
          ctx.fillStyle = this.feedback.isCorrect ? '#10b981' : '#ef4444';
          ctx.fill();
        }
      }
    }
  }
}
