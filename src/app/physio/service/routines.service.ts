import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Exercise, Routine, RoutineDifficulty } from '../domain/routine';

@Injectable({
  providedIn: 'root',
})
export class RoutinesService {
  public routines: Routine[] = [
    {
      id: 1001,
      name: 'Rehabilitación Lumbar Básica',
      category: 'Lumbar',
      description: 'Rutina para fortalecer la zona lumbar y reducir dolor.',
      difficulty: RoutineDifficulty.Easy,
      estimatedDuration: 900, // 15 minutos
      targetArea: 1,
      numWeeks: 4,
      daysWeek: ['LUN', 'MIE', 'VIE'],
      isfavorite: false,
      exercises: [
        {
          id: 1,
          name: 'Puente de glúteos',
          videoUrl: 'https://example.com/videos/puente.mp4',
          sets: 30,
          repetitions: 12,
          withAssistant: false,
          description: 'Eleva pelvis manteniendo la contracción.',
          keymoments: [],
        },
        {
          id: 2,
          name: 'Plancha frontal',
          videoUrl: 'https://example.com/videos/plancha.mp4',
          sets: 45,
          repetitions: 1,
          withAssistant: false,
          description: 'Mantener posición de tabla.',
          keymoments: [],
        },
      ],
    },
    {
      id: 1002,
      name: 'Fortalecimiento de Hombro',
      category: 'Hombro',
      description: 'Ejercicios para mejorar la estabilidad del hombro.',
      difficulty: RoutineDifficulty.Medium,
      estimatedDuration: 1200, // 20 minutos
      targetArea: 1,
      numWeeks: 6,
      daysWeek: ['MAR', 'JUE'],
      isfavorite: false,
      exercises: [
        {
          id: 3,
          name: 'Elevación lateral',
          videoUrl: 'https://example.com/videos/lateral.mp4',
          sets: 30,
          repetitions: 15,
          withAssistant: false,
          description: 'Eleva brazos lateralmente.',
          keymoments: [],
        },
      ],
    },
  ];

  // → Simulación de “tabla” de ejercicios independiente
  private exercises: Exercise[] = [
    {
      id: 1,
      name: 'Puente de glúteos',
      videoUrl: '',
      sets: 30,
      repetitions: 12,
      withAssistant: false,
      description: '',
      keymoments: [],
    },
    {
      id: 2,
      name: 'Plancha frontal',
      videoUrl: '',
      sets: 45,
      repetitions: 1,
      withAssistant: false,
      description: '',
      keymoments: [],
    },
    {
      id: 3,
      name: 'Elevación lateral',
      videoUrl: '',
      sets: 30,
      repetitions: 15,
      withAssistant: false,
      description: '',
      keymoments: [],
    },
  ];

  constructor() {} // private http: HttpClient

  // === RUTINAS CRUD SOBRE EL ARRAY SIMULADO ===

  getAllRoutines(): Observable<Routine[]> {
    // → HTTP real: this.http.get<Routine[]>(this.routinesUrl)
    return of(this.routines);
  }

  getRoutineById(id: number): Observable<Routine | undefined> {
    // → HTTP real: this.http.get<Routine>(`${this.routinesUrl}/${id}`)
    const found = this.routines.find((r) => r.id === id);
    return of(found);
  }

  createRoutine(routine: Routine): Observable<Routine> {
    // → HTTP real: this.http.post<Routine>(this.routinesUrl, routine)
    const newRoutine = { ...routine, id: Date.now() };
    this.routines.push(newRoutine);
    return of(newRoutine);
  }

  updateRoutine(id: number, routine: Routine): Observable<Routine | undefined> {
    // → HTTP real: this.http.put<Routine>(`${this.routinesUrl}/${id}`, routine)
    const idx = this.routines.findIndex((r) => r.id === id);
    if (idx > -1) {
      this.routines[idx] = { ...routine, id };
      return of(this.routines[idx]);
    }
    return of(undefined);
  }

  deleteRoutine(id: number): Observable<boolean> {
    // → HTTP real: this.http.delete<void>(`${this.routinesUrl}/${id}`)
    const initialLength = this.routines.length;
    this.routines = this.routines.filter((r) => r.id !== id);
    return of(this.routines.length < initialLength);
  }

  // === EJERCICIOS CRUD SOBRE EL ARRAY SIMULADO ===

  getAllExercises(): Observable<Exercise[]> {
    // → HTTP real: this.http.get<Exercise[]>(this.exercisesUrl)
    return of(this.exercises);
  }

  getExerciseById(id: number): Observable<Exercise | undefined> {
    // → HTTP real: this.http.get<Exercise>(`${this.exercisesUrl}/${id}`)
    const ex = this.exercises.find((e) => e.id === id);
    return of(ex);
  }

  createExercise(ex: Exercise): Observable<Exercise> {
    // → HTTP real: this.http.post<Exercise>(this.exercisesUrl, ex)
    const newEx = { ...ex, id: Date.now() };
    this.exercises.push(newEx);
    return of(newEx);
  }

  updateExercise(id: number, ex: Exercise): Observable<Exercise | undefined> {
    // → HTTP real: this.http.put<Exercise>(`${this.exercisesUrl}/${id}`, ex)
    const idx = this.exercises.findIndex((e) => e.id === id);
    if (idx > -1) {
      this.exercises[idx] = { ...ex, id };
      return of(this.exercises[idx]);
    }
    return of(undefined);
  }

  deleteExercise(id: number): Observable<boolean> {
    // → HTTP real: this.http.delete<void>(`${this.exercisesUrl}/${id}`)
    const initialLength = this.exercises.length;
    this.exercises = this.exercises.filter((e) => e.id !== id);
    return of(this.exercises.length < initialLength);
  }
}
