import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ExercisesService {
  constructor(private http: HttpClient) {}

  // 1. Obtener todos los ejercicios
  getAllExercises(): Observable<any> {
    return this.http.get(`${environment.BASE_URL}/exercise`);
  }

  // 2. Obtener ejercicio por ID
  getExerciseById(id: number | string): Observable<any> {
    return this.http.get(`${environment.BASE_URL}/exercise/${id}`);
  }

  // 3. Crear ejercicio
  createExercise(exercise: any): Observable<any> {
    return this.http.post(`${environment.BASE_URL}/exercise`, exercise);
  }

  // 4. Actualizar ejercicio
  updateExercise(id: number | string, exercise: any): Observable<any> {
    return this.http.put(`${environment.BASE_URL}/exercise/${id}`, exercise);
  }

  // 5. Eliminar ejercicio
  deleteExercise(id: number | string): Observable<any> {
    return this.http.delete(`${environment.BASE_URL}/exercise/${id}`);
  }
}
