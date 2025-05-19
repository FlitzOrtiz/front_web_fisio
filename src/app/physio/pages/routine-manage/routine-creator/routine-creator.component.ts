import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormArray,
  ReactiveFormsModule,
} from '@angular/forms';
import { Exercise, Routine } from '../../../domain/routine';
import { ExerciseEditorComponent } from '../exercise-editor/exercise-editor.component';
import { CommonModule } from '@angular/common';
import { FbuttonComponent } from '../../../../common/component/fbutton/fbutton.component';
import { UserHeaderComponent } from '../../../../common/component/user-header/user-header.component';

@Component({
  selector: 'app-routine-creator',
  imports: [
    ExerciseEditorComponent,
    CommonModule,
    ReactiveFormsModule,
    FbuttonComponent,
    UserHeaderComponent,
  ],
  templateUrl: './routine-creator.component.html',
  styleUrl: './routine-creator.component.scss',
})
export class RoutineCreatorComponent {
  routineForm: FormGroup;
  exercises: Exercise[] = [];
  showExerciseModal = false;
  currentExercise: Exercise | null = null;
  editingExerciseIndex: number = -1;

  difficulties = ['Básica', 'Intermedia', 'Avanzada'];
  targetAreas = [
    'Espalda',
    'Lumbar',
    'Cervical',
    'Hombro',
    'Rodilla',
    'Cadera',
    'Tobillo',
  ];
  weekdays = [
    { code: 'LUN', name: 'Lunes', selected: false },
    { code: 'MAR', name: 'Martes', selected: false },
    { code: 'MIÉ', name: 'Miércoles', selected: false },
    { code: 'JUE', name: 'Jueves', selected: false },
    { code: 'VIE', name: 'Viernes', selected: false },
    { code: 'SÁB', name: 'Sábado', selected: false },
    { code: 'DOM', name: 'Domingo', selected: false },
  ];

  totalDuration: number = 0;

  constructor(private fb: FormBuilder) {
    this.routineForm = this.fb.group({
      name: ['', Validators.required],
      category: ['', Validators.required],
      description: [''],
      difficulty: ['Intermedia', Validators.required],
      estimatedDuration: [0, [Validators.required, Validators.min(0)]],
      targetArea: ['Espalda', Validators.required],
      weeks: [1, [Validators.required, Validators.min(1)]],
      days: this.fb.array([]),
    });

    // Inicializar con algunos ejercicios de ejemplo
    this.exercises = [
      {
        id: 1,
        name: 'Ejercicio 1',
        videoUrl: 'https://example.com/video1.mp4',
        sets: 30,
        repetitions: 10,
        withAssistant: false,
        description: 'Descripción del ejercicio 1',
        keymoments: [],
      },
      {
        id: 2,
        name: 'Ejercicio 2',
        videoUrl: 'https://example.com/video2.mp4',
        sets: 45,
        repetitions: 12,
        withAssistant: true,
        description: 'Descripción del ejercicio 2',
        keymoments: [],
      },
    ];
  }

  ngOnInit(): void {
    // Inicializar el FormArray para los días
    this.weekdays.forEach((day) => {
      (this.routineForm.get('days') as FormArray).push(
        this.fb.control(day.selected)
      );
    });
  }

  get daysFormArray() {
    return this.routineForm.get('days') as FormArray;
  }

  toggleDay(index: number) {
    const currentValue = this.daysFormArray.at(index).value;
    this.daysFormArray.at(index).setValue(!currentValue);
    this.weekdays[index].selected = !currentValue;
  }

  openAddExerciseModal() {
    this.currentExercise = null;
    this.editingExerciseIndex = -1;
    this.showExerciseModal = true;
  }

  openEditExerciseModal(index: number) {
    this.currentExercise = { ...this.exercises[index] };
    this.editingExerciseIndex = index;
    this.showExerciseModal = true;
  }

  closeExerciseModal() {
    this.showExerciseModal = false;
    this.currentExercise = null;
    this.editingExerciseIndex = -1;
  }

  saveExercise(exercise: any) {
    console.log('Ejercicio guardado:', JSON.stringify(exercise));
    if (this.editingExerciseIndex > -1) {
      this.exercises[this.editingExerciseIndex] = exercise;
    } else {
      this.exercises.push(exercise);
    }
    this.closeExerciseModal();
    console.log('Ejercicio guardado:', this.exercises);
  }

  removeExercise(index: number) {
    this.exercises.splice(index, 1);
  }

  saveRoutine() {
    if (this.routineForm.valid) {
      const formValue = this.routineForm.value;

      // Convertir el FormArray de días a un array de códigos de día
      const selectedDays = this.weekdays
        .filter((_, index) => formValue.days[index])
        .map((day) => day.code);

      const routine: Routine = {
        id: Date.now(), // Generar un ID temporal
        ...formValue,
        days: selectedDays,
        exercises: this.exercises,
      };

      console.log('Rutina guardada:', routine);
      // Aquí implementarías la lógica para guardar la rutina en tu backend
    } else {
      // Marcar todos los campos como touched para mostrar errores
      Object.keys(this.routineForm.controls).forEach((key) => {
        const control = this.routineForm.get(key);
        control?.markAsTouched();
      });
    }
  }

  cancel() {
    // Implementar lógica para cancelar y volver a la página anterior
    console.log('Operación cancelada');
  }
}
