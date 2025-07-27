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
import { ExercisesService } from '../../../service/exercises.service';

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
  targetAreas: any[] = [];
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
    private routineService: RoutinesService,
    private exerciseService: ExercisesService
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
    // Cargar áreas objetivo desde el backend
    this.routineService.loadTargetAreas().subscribe((areas) => {
      this.targetAreas = areas;
      if (!this.routineForm.get('targetArea')?.value && areas.length > 0) {
        this.routineForm.get('targetArea')?.setValue(areas[0].id);
      }
      // Si hay rutinaId, cargar la rutina después de tener el catálogo
      if (this.routineId) {
        this.routineService
          .getRoutineById(this.routineId!)
          .subscribe((response) => {
            if (response && response.routine) {
              this.populateForm(response.routine);
            }
          });
      }
    });

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
        // Ya no cargar rutina aquí, se hace después de cargar áreas objetivo
      } else {
        this.mode = 'new';
      }
    });
  }

  /** Rellena el formulario con los datos de la rutina a editar/ver */
  private populateForm(r: any) {
    // Mapear días de la API a los códigos cortos
    const dayMap: { [key: string]: string } = {
      MONDAY: 'LUN',
      TUESDAY: 'MAR',
      WEDNESDAY: 'MIÉ',
      THURSDAY: 'JUE',
      FRIDAY: 'VIE',
      SATURDAY: 'SÁB',
      SUNDAY: 'DOM',
    };
    const mappedDays = r.days.map((d: string) => dayMap[d] || d);

    // Mapear ejercicios para que tengan la estructura esperada
    const mappedExercises = (r.exercises || []).map((ex: any) => ({
      id: ex.exerciseId,
      name: ex.name,
      description: ex.description,
      videoUrl: ex.videoUrl,
      sets: ex.sets,
      repetitions: ex.repetitions,
      withAssistant: ex.assisted,
      keymoments: (ex.keyMoments || []).map((km: any) => ({
        id: km.id,
        description: km.description,
        timestamp: typeof km.timestamp === 'number' ? km.timestamp : 0,
      })),
    }));

    this.routineForm.patchValue({
      name: r.name,
      category: r.category,
      description: r.description,
      difficulty:
        this.difficulties.indexOf(r.difficulty) !== -1
          ? this.difficulties.indexOf(r.difficulty)
          : 1, // default to Intermedia if not found
      estimatedDuration: r.duration,
      targetArea: r.objectiveArea?.id || '',
      weeks: r.weeks,
    });

    // Marcar días
    (this.routineForm.get('days') as FormArray).controls.forEach((ctrl, i) => {
      ctrl.setValue(mappedDays.includes(this.weekdays[i].code));
    });

    // Cargar ejercicios
    this.exercises = mappedExercises;

    // Si estamos en view, deshabilitamos todo
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

    // Preprocesar ejercicios antes de enviar al backend
    const processedExercises = this.exercises.map((ex) => {
      return {
        name: (ex.name || '').toUpperCase().trim(),
        video_url: ex.videoUrl,
        sets: ex.sets,
        repetitions: ex.repetitions,
        assisted: !!ex.withAssistant,
        description: (ex.description || '').trim(),
        key_moments: (ex.keymoments || []).map((km: any) => ({
          description: (km.description || '').trim(),
          timestamp: km.timestamp ?? km.time ?? 0,
        })),
      };
    });

    const fv = this.routineForm.value;
    const days = this.weekdays.filter((_, i) => fv.days[i]).map((d) => d.name);
    const payload = {
      id: this.routineId || 0,
      name: (fv.name || '').trim(),
      category: (fv.category || '').trim(),
      description: (fv.description || '').trim(),
      difficulty:
        typeof fv.difficulty === 'number'
          ? fv.difficulty
          : this.difficulties.indexOf(fv.difficulty),
      duration: fv.estimatedDuration,
      target_area_id: fv.targetArea,
      weeks: fv.weeks,
      days,
      exercises: processedExercises,
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
