import {
  Component,
  ViewChild,
  ElementRef,
  AfterViewInit,
  Inject,
  PLATFORM_ID,
  OnDestroy
} from '@angular/core';
import { isPlatformBrowser, CommonModule } from '@angular/common';
import { FbuttonComponent } from '../../../common/component/fbutton/fbutton.component';
import { Router } from '@angular/router';

declare var YT: any;

@Component({
  selector: 'app-exercise',
  standalone: true,
  imports: [CommonModule, FbuttonComponent],
  templateUrl: './exercise.component.html',
  styleUrls: ['./exercise.component.scss'],
})
export class ExerciseComponent implements AfterViewInit, OnDestroy {
  @ViewChild('cameraVideo') cameraVideo!: ElementRef<HTMLVideoElement>;

  exercises = [
    {
      title: 'Movilidad de hombro',
      instructions: 'Eleva y baja los hombros en forma circular.',
      videoUrl: 'https://www.youtube.com/embed/H3sy0-V0Myw',
      metrics: { precision: 85, posture: 72, speed: 20 },
      tips: [
        'Realiza el movimiento suave.',
        'Mantén el cuello relajado.',
        'Evita encoger los hombros demasiado.',
      ],
    },
    {
      title: 'Flexión de dedos',
      instructions: 'Abre y cierra la mano lentamente varias veces.',
      videoUrl: 'https://www.youtube.com/embed/LPKhyTkj2Z4',
      metrics: { precision: 78, posture: 88, speed: 30 },
      tips: [
        'Estira bien los dedos al abrir la mano.',
        'Evita movimientos bruscos.',
        'Respira de forma constante.',
      ],
    },
    {
      title: 'Elevación de brazo',
      instructions: 'Sube el brazo hasta arriba y bájalo despacio.',
      videoUrl: 'https://www.youtube.com/embed/20X4nmYsbDg',
      metrics: { precision: 90, posture: 70, speed: 25 },
      tips: [
        'Controla el movimiento al bajar el brazo.',
        'Mantén el brazo estirado.',
        'Mira al frente para no desbalancearte.',
      ],
    },
  ];

  currentExerciseIndex = 0;
  player: any;
  duration = 0;
  currentTime = 0;
  trackingInterval: any;
  stream: MediaStream | null = null;

  get currentExercise() {
    return this.exercises[this.currentExerciseIndex];
  }

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private router: Router
  ) {}

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.initPlayer();
      this.loadYouTubeAPI();
      this.startCamera();
    }
  }

  ngOnDestroy(): void {
    this.stopCamera();
    if (this.trackingInterval) clearInterval(this.trackingInterval);
    if (this.player) this.player.destroy();
  }

  loadYouTubeAPI() {
    if ((window as any).YT && (window as any).YT.Player) {
      this.initPlayer();
      return;
    }

    const scriptExists = document.getElementById('youtube-api');
    if (!scriptExists) {
      const script = document.createElement('script');
      script.id = 'youtube-api';
      script.src = 'https://www.youtube.com/iframe_api';
      document.body.appendChild(script);
    }

    (window as any).onYouTubeIframeAPIReady = () => {
      this.initPlayer();
    };
  }

    initPlayer() {
    const videoId = this.extractVideoId(this.currentExercise.videoUrl);
    setTimeout(() => {
        if (this.player) {
        this.player.loadVideoById(videoId);
        this.resetTimer();
        this.startTracking();
        return;
        }

        this.player = new YT.Player('exercise-video', {
        videoId,
        width: '100%',
        height: '100%',
        events: {
            onReady: (event: any) => {
            event.target.playVideo();
            this.resetTimer();
            this.startTracking();
            }
        }
        });
    }, 300);
    }
    
    resetTimer() {
    this.duration = 0;
    this.currentTime = 0;
    }


  startTracking() {
    if (this.trackingInterval) clearInterval(this.trackingInterval);

    this.trackingInterval = setInterval(() => {
      if (this.player && this.player.getCurrentTime) {
        this.currentTime = this.player.getCurrentTime();
        this.duration = this.player.getDuration();
        if (this.currentTime >= this.duration - 0.5) {
          clearInterval(this.trackingInterval);
          this.skipExercise();
        }
      }
    }, 1000);
  }

  extractVideoId(url: string): string {
    const match = url.match(/(?:\/embed\/|v=)([^&?]+)/);
    return match ? match[1] : '';
  }

  skipExercise() {
    if (this.trackingInterval) {
      clearInterval(this.trackingInterval);
    }

    this.currentExerciseIndex++;

    if (this.currentExerciseIndex >= this.exercises.length) {
      this.stopCamera
      this.router.navigate(['/register']);
      return;
    }

    this.currentTime = 0;
    this.duration = 0;

    this.initPlayer();
  }

  startCamera() {
    navigator.mediaDevices?.getUserMedia({ video: true })
      .then((stream) => {
        this.stream = stream;
        if (this.cameraVideo?.nativeElement) {
          this.cameraVideo.nativeElement.srcObject = stream;
        }
      })
      .catch((err) => {
        console.error('No se pudo acceder a la cámara:', err);
      });
  }

  stopCamera() {
    if (this.stream) {
      this.stream.getTracks().forEach(track => track.stop());
      this.stream = null;
    }
  }

  getColor(value: number): string {
    if (value >= 80) return 'green';
    if (value >= 40) return 'orange';
    return 'red';
  }
}   
