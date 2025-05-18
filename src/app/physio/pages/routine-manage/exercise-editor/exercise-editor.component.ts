import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
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

@Component({
  selector: 'app-exercise-editor',
  imports: [CommonModule, ReactiveFormsModule, FbuttonComponent],
  templateUrl: './exercise-editor.component.html',
  styleUrl: './exercise-editor.component.scss',
})
export class ExerciseEditorComponent {
  @Input() exercise: Exercise | null = null;
  @Output() save = new EventEmitter<Exercise>();
  @Output() cancel = new EventEmitter<void>();

  exerciseForm: FormGroup;
  activeTab: 'youtube' | 'upload' | 'library' = 'youtube';

  constructor(private fb: FormBuilder) {
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
          keyMomentsArray.push(this.createKeyMomentForm(moment));
        });
      }
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

  setActiveTab(tab: 'youtube' | 'upload' | 'library') {
    this.activeTab = tab;
  }

  addKeyMoment() {
    this.keyMomentsArray.push(this.createKeyMomentForm());
  }

  removeKeyMoment(index: number) {
    this.keyMomentsArray.removeAt(index);
  }

  onSubmit() {
    if (this.exerciseForm.valid) {
      const formValue = this.exerciseForm.value;

      const exercise: Exercise = {
        id: this.exercise?.id || Date.now(),
        name: formValue.name,
        videoUrl: formValue.videoUrl,
        sets: formValue.series,
        repetitions: formValue.repetitionsPerSeries,
        withAssistant: formValue.withCompanion,
        description: formValue.description,
        keymoments: formValue.keyMoments,
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

      const exercise: Exercise = {
        id: this.exercise?.id || Date.now(),
        name: formValue.name,
        videoUrl: formValue.videoUrl,
        sets: formValue.series,
        repetitions: formValue.repetitionsPerSeries,
        withAssistant: formValue.withCompanion,
        description: formValue.description,
        keymoments: formValue.keyMoments,
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
}
