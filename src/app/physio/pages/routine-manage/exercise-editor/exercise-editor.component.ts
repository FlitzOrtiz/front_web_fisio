import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  AfterViewInit,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormArray,
  ReactiveFormsModule,
} from '@angular/forms';
import { Exercise, KeyMoment } from '../../../domain/routine';
import { CommonModule } from '@angular/common';
import { FbuttonComponent } from '../../../../common/component/fbutton/fbutton.component';
import { RoutinesService } from '../../../service/routines.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-exercise-editor',
  imports: [CommonModule, ReactiveFormsModule, FbuttonComponent],
  templateUrl: './exercise-editor.component.html',
  styleUrl: './exercise-editor.component.scss',
})
export class ExerciseEditorComponent implements OnInit, AfterViewInit {
  @Input() exercise: Exercise | null = null;
  @Output() save = new EventEmitter<Exercise>();
  @Output() cancel = new EventEmitter<void>();

  exerciseForm: FormGroup;
  activeTab: 'youtube' | 'library' = 'youtube';
  videos: any[] = [];
  videoPlayerRef: any;
  videoId: string = '';
  ytPlayer: any;
  ytApiLoaded: boolean = false;
  sanitizedVideoUrl: SafeResourceUrl = '';

  constructor(
    private fb: FormBuilder,
    private routineService: RoutinesService,
    private sanitizer: DomSanitizer
  ) {
    this.exerciseForm = this.createForm();
  }

  ngOnInit(): void {
    if (this.exercise) {
      this.exerciseForm.patchValue({
        name: this.exercise.name,
        videoUrl: this.exercise.videoUrl || '',
        series: this.exercise.sets || 0,
        repetitionsPerSeries: this.exercise.repetitions || 0,
        withCompanion: this.exercise.withAssistant || false,
        description: this.exercise.description || '',
      });

      // Cargar momentos clave si existen
      if (this.exercise.keymoments && this.exercise.keymoments.length > 0) {
        const keyMomentsArray = this.exerciseForm.get(
          'keyMoments'
        ) as FormArray;
        keyMomentsArray.clear();
        this.exercise.keymoments.forEach((moment) => {
          let timeValue = 0;
          if (
            'timestamp' in moment &&
            typeof (moment as any).timestamp === 'number'
          ) {
            timeValue = (moment as any).timestamp;
          } else if (typeof moment.time === 'number') {
            timeValue = moment.time;
          }
          keyMomentsArray.push(
            this.createKeyMomentForm({
              id: moment.id,
              time: timeValue,
              description: moment.description || '',
            })
          );
        });
      }
      this.videoId = this.extractVideoId(this.exercise.videoUrl || '');
    }

    this.routineService.getAllVideosCached().subscribe((videos) => {
      console.log('Fetched videos:', videos);
      this.videos = videos;
    });
  }

  ngAfterViewInit(): void {
    this.loadYouTubeAPI();
  }

  loadYouTubeAPI() {
    if (this.ytApiLoaded || !this.videoId) return;
    this.ytApiLoaded = true;
    // Cargar el script de la API de YouTube si no está presente
    if (!(window as any).YT) {
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      document.body.appendChild(tag);
    }
    (window as any).onYouTubeIframeAPIReady = () => {
      this.createYTPlayer();
    };
    // Si la API ya está cargada
    if ((window as any).YT && (window as any).YT.Player) {
      this.createYTPlayer();
    }
  }

  createYTPlayer() {
    if (this.ytPlayer) {
      this.ytPlayer.destroy();
    }
    this.ytPlayer = new (window as any).YT.Player('youtube-player', {
      videoId: this.videoId,
      events: {
        onReady: () => {},
        onError: (event: any) => {
          alert(
            'No se pudo cargar el video de YouTube. Intenta con otro enlace.'
          );
        },
      },
    });
  }

  extractVideoId(url: string): string {
    const regExp =
      /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/i;
    const match = url.match(regExp);
    return match ? match[1] : '';
  }

  refreshVideos() {
    this.routineService.refreshVideosCache().subscribe((videos) => {
      this.videos = videos;
    });
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      const reader = new FileReader();
      reader.onload = (e) => {
        this.exerciseForm.patchValue({
          videoUrl: e.target?.result,
        });
      };
      reader.readAsDataURL(file);
    }
  }

  createForm(): FormGroup {
    return this.fb.group({
      name: ['', Validators.required],
      videoUrl: [''],
      series: [0, [Validators.required, Validators.min(0)]],
      repetitionsPerSeries: [0, [Validators.required, Validators.min(0)]],
      withCompanion: [false],
      description: [''],
      keyMoments: this.fb.array([]),
    });
  }

  createKeyMomentForm(keyMoment?: KeyMoment): FormGroup {
    return this.fb.group({
      id: [keyMoment?.id || Date.now()],
      time: [keyMoment?.time || 0, [Validators.required, Validators.min(0)]],
      description: [keyMoment?.description || '', Validators.required],
    });
  }

  get keyMomentsArray() {
    return this.exerciseForm.get('keyMoments') as FormArray;
  }

  // Elimina la pestaña de subir videos y muestra todos los videos en la biblioteca
  setActiveTab(tab: 'youtube' | 'library') {
    this.activeTab = tab;
  }

  get allVideos() {
    // Aquí deberías llamar al servicio para obtener todos los videos
    // Por ejemplo, si tienes un servicio de videos:
    // return this.videoService.getAllVideos();
    // Pero para mostrar en la biblioteca, puedes usar una variable local
    return this.videos || [];
  }

  addKeyMoment() {
    this.keyMomentsArray.push(this.createKeyMomentForm());
  }

  addKeyMomentFromVideo() {
    let currentTime = 0;
    if (this.ytPlayer && typeof this.ytPlayer.getCurrentTime === 'function') {
      currentTime = Math.floor(this.ytPlayer.getCurrentTime());
    } else {
      alert('El reproductor no está listo. Espera a que el video cargue.');
      return;
    }
    this.keyMomentsArray.push(
      this.createKeyMomentForm({
        id: Date.now(),
        time: currentTime,
        description: '',
      })
    );
  }

  removeKeyMoment(index: number) {
    this.keyMomentsArray.removeAt(index);
  }

  onSubmit() {
    if (this.exerciseForm.valid) {
      const formValue = this.exerciseForm.value;
      const keymoments = (formValue.keyMoments || []).map((km: any) => ({
        id: km.id,
        description: km.description,
        timestamp: typeof km.time === 'number' ? km.time : 0,
      }));
      const exercise: Exercise = {
        id: this.exercise?.id || Date.now(),
        name: formValue.name,
        videoUrl: formValue.videoUrl,
        sets: formValue.series,
        repetitions: formValue.repetitionsPerSeries,
        withAssistant: formValue.withCompanion,
        description: formValue.description,
        keymoments,
      };
      this.save.emit(exercise);
    } else {
      // Marcar todos los campos como touched para mostrar errores
      Object.keys(this.exerciseForm.controls).forEach((key) => {
        const control = this.exerciseForm.get(key);
        control?.markAsTouched();
      });
    }
  }

  saveExercise() {
    if (this.exerciseForm.valid) {
      const formValue = this.exerciseForm.value;
      const keymoments = (formValue.keyMoments || []).map((km: any) => ({
        id: km.id,
        description: km.description,
        timestamp: typeof km.time === 'number' ? km.time : 0,
      }));
      const exercise: Exercise = {
        id: this.exercise?.id || Date.now(),
        name: formValue.name,
        videoUrl: formValue.videoUrl,
        sets: formValue.series,
        repetitions: formValue.repetitionsPerSeries,
        withAssistant: formValue.withCompanion,
        description: formValue.description,
        keymoments,
      };

      this.save.emit(exercise);
    } else {
      // Marcar todos los campos como touched para mostrar errores
      Object.keys(this.exerciseForm.controls).forEach((key) => {
        const control = this.exerciseForm.get(key);
        control?.markAsTouched();
      });
    }
  }

  onCancel() {
    this.cancel.emit();
  }

  onVideoUrlChange() {
    const url = this.exerciseForm.value.videoUrl;
    const id = this.extractVideoId(url);
    this.videoId = id && id.length === 11 ? id : '';
    this.updateSanitizedVideoUrl();
    this.loadYouTubeAPI();
  }

  updateSanitizedVideoUrl() {
    if (this.videoId) {
      this.sanitizedVideoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
        'https://www.youtube.com/embed/' + this.videoId
      );
    } else {
      this.sanitizedVideoUrl = '';
    }
  }

  formatSeconds(totalSeconds: number): string {
    if (typeof totalSeconds !== 'number' || isNaN(totalSeconds))
      return '00:00:00';
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = Math.floor(totalSeconds % 60);
    return (
      String(hours).padStart(2, '0') +
      ':' +
      String(minutes).padStart(2, '0') +
      ':' +
      String(seconds).padStart(2, '0')
    );
  }
}
