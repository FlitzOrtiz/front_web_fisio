import { CommonModule } from '@angular/common';
import {
  Component,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
  Output,
  EventEmitter,
} from '@angular/core';
import * as poseDetection from '@tensorflow-models/pose-detection';
import * as tf from '@tensorflow/tfjs';
import '@tensorflow/tfjs-backend-webgl';

export interface ExerciseMetrics {
  accuracy: number;
  posture: number;
  speed: number;
  feedback: string;
}

interface PoseKeypoint {
  x: number;
  y: number;
  score: number;
  name: string;
}

@Component({
  selector: 'app-pose-detection',
  templateUrl: './pose-detection.component.html',
  imports: [CommonModule],
  styleUrls: ['./pose-detection.component.scss'],
})
export class PoseDetectionComponent implements OnInit, OnDestroy {
  @Input() exerciseName?: string;
  @Output() metrics = new EventEmitter<ExerciseMetrics>();

  @ViewChild('video') videoRef!: ElementRef<HTMLVideoElement>;
  @ViewChild('canvas') canvasRef!: ElementRef<HTMLCanvasElement>;

  feedback = { isCorrect: false, confidence: 0, message: 'Inicializando...' };
  isLoading = true;

  private lastPoseTime = performance.now();

  private isMounted = true;
  private animationId: number | undefined;

  ngOnInit(): void {
    this.init();
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
          const metrics = this.validateExercise(this.exerciseName, poses[0]);
          this.feedback = {
            isCorrect: metrics.posture > 50,
            confidence: metrics.accuracy / 100,
            message: metrics.feedback,
          };
          this.metrics.emit(metrics);
        }
      } catch (err) {
        console.error('Detection error', err);
      }

      this.animationId = requestAnimationFrame(detect);
    };

    detect();
  }

  private validateExercise(exercise: string, pose: any): ExerciseMetrics {
    // Simple heuristic calculations for demo purposes
    const keypointScores = pose.keypoints?.map((k: PoseKeypoint) => k.score) || [];
    const avgScore = keypointScores.length
      ? keypointScores.reduce((a: number, b: number) => a + b, 0) / keypointScores.length
      : 0;

    // Posture correctness: use avgScore as proxy
    const posture = Math.round(avgScore * 100);

    // Speed: measure time between valid detections
    const now = performance.now();
    const delta = now - this.lastPoseTime; // ms between frames
    this.lastPoseTime = now;
    const speed = Math.min(100, Math.round((1000 / delta) * 10)); // arbitrary scaling

    const isCorrect = avgScore > 0.5;
    const accuracy = Math.round(avgScore * 100);

    const feedback = isCorrect ? 'Buen movimiento' : 'Intenta ajustar la postura';

    return { accuracy, posture, speed, feedback };
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
