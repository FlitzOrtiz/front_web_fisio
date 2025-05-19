import { Component, ElementRef, ViewChild } from '@angular/core';
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
import { ActivatedRoute, Router } from '@angular/router';
import { RoutinesService } from '../../../service/routines.service';

type Mode = 'new' | 'edit' | 'view';

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

  // modo actual del componente
  mode: Mode = 'new';
  routineId?: number;

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

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private routineService: RoutinesService
  ) {
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
  }

  ngOnInit(): void {
    // Inicializar el FormArray para los días
    this.weekdays.forEach(() =>
      (this.routineForm.get('days') as FormArray).push(this.fb.control(false))
    );

    // Determinar modo a partir de la ruta
    this.route.paramMap.subscribe((params) => {
      const idParam = params.get('id');
      if (idParam) {
        this.routineId = +idParam;
        this.mode =
          this.route.snapshot.queryParamMap.get('mode') === 'view'
            ? 'view'
            : 'edit';

        // cargar datos de la rutina
        this.routineService.getRoutineById(this.routineId!).subscribe((r) => {
          if (r) this.populateForm(r);
        });
      } else {
        this.mode = 'new';
      }
    });

    // cargar ejercicios disponibles
    this.routineService.getAllExercises().subscribe((list) => {
      this.exercises = list;
    });
  }

  /** Rellena el formulario con los datos de la rutina a editar/ver */
  private populateForm(r: Routine) {
    console.log('populateForm', r);
    this.routineForm.patchValue({
      name: r.name,
      category: r.category,
      description: r.description,
      difficulty: this.difficulties[r.difficulty as unknown as number],
      estimatedDuration: r.estimatedDuration,
      targetArea: this.targetAreas[r.targetArea as unknown as number],
      weeks: r.numWeeks,
    });

    // marcar días
    (this.routineForm.get('days') as FormArray).controls.forEach((ctrl, i) => {
      ctrl.setValue(r.daysWeek.includes(this.weekdays[i].code));
    });

    // si estamos en view, deshabilitamos todo
    if (this.mode === 'view') {
      this.routineForm.disable();
    }
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
    if (this.editingExerciseIndex > -1) {
      this.exercises[this.editingExerciseIndex] = exercise;
    } else {
      this.exercises.push(exercise);
    }
    this.closeExerciseModal();
  }

  removeExercise(index: number) {
    this.exercises.splice(index, 1);
  }

  saveRoutine() {
    if (this.mode === 'view') return;

    if (this.routineForm.invalid) {
      Object.values(this.routineForm.controls).forEach((c) =>
        c.markAsTouched()
      );
      return;
    }

    const fv = this.routineForm.value;
    const days = this.weekdays.filter((_, i) => fv.days[i]).map((d) => d.code);
    const payload: Routine = {
      id: this.routineId || 0,
      ...fv,
      days,
      exercises: this.exercises,
    };

    const obs =
      this.mode === 'edit'
        ? this.routineService.updateRoutine(this.routineId!, payload)
        : this.routineService.createRoutine(payload);

    obs.subscribe((_) => this.router.navigate(['/routinemanage']));
  }

  cancel() {
    this.router.navigate(['/routinemanage']);
  }
}
