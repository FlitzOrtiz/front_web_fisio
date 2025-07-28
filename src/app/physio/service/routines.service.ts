import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { getFromLocalStorage } from '../../common/utils/localstorage.util';

@Injectable({
  providedIn: 'root',
})
export class RoutinesService {
  private videosCache: any[] = [];
  private targetAreasCatalog: any[] = [];

  constructor(private http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    const token = getFromLocalStorage('accessToken');
    console.log('Using token:', token);
    let headers = new HttpHeaders();
    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  }

  // 1. Get Catalog of Target Areas
  getTargetAreas(): Observable<any> {
    return this.http.get(`${environment.BASE_URL}/catalog/target-areas`, {
      headers: this.getAuthHeaders(),
    });
  }

  getRoutineById(id: number | string): Observable<any> {
    return this.http.get(`${environment.BASE_URL}/routines/${id}`, {
      headers: this.getAuthHeaders(),
    });
  }

  // 2. Get All Routines
  getAllRoutines(): Observable<any> {
    return this.http.get(`${environment.BASE_URL}/routines`, {
      headers: this.getAuthHeaders(),
    });
  }

  // 3. Create a New Routine
  createRoutine(routine: any): Observable<any> {
    return this.http.post(`${environment.BASE_URL}/routines`, routine, {
      headers: this.getAuthHeaders(),
    });
  }

  /**
   * Maps a frontend routine object to the backend format for create/update
   */
  private mapRoutineToBackend(routine: any): any {
    return {
      name: routine.name,
      category: routine.category,
      description: routine.description,
      difficulty:
        typeof routine.difficulty === 'number'
          ? routine.difficulty
          : this.mapDifficulty(routine.difficulty),
      duration: routine.estimatedDuration || routine.duration,
      target_area_id:
        typeof routine.targetArea === 'number'
          ? routine.targetArea
          : this.mapTargetArea(routine.targetArea),
      weeks: routine.weeks,
      days: (routine.days || []).map((d: any) => this.mapDay(d)),
      exercises: (routine.exercises || []).map((ex: any) => ({
        name: ex.name,
        video_url: ex.videoUrl || ex.video_url,
        sets: ex.sets,
        repetitions: ex.repetitions,
        assisted: ex.withAssistant ?? ex.assisted,
        description: ex.description,
        key_moments: (ex.keymoments || ex.key_moments || []).map((km: any) => ({
          description: km.description,
          timestamp: km.timestamp,
        })),
      })),
    };
  }

  /**
   * Example mapping functions. You should replace these with your actual logic/catalogs.
   */
  private mapDifficulty(diff: any): number {
    // Example: 'Avanzada' => 2, 'Intermedia' => 1, 'Básica' => 0
    if (typeof diff === 'number') return diff;
    switch (diff) {
      case 'Avanzada':
        return 2;
      case 'Intermedia':
        return 1;
      case 'Básica':
        return 0;
      default:
        return 0;
    }
  }

  /**
   * Load and cache target areas from backend
   */
  loadTargetAreas(): Observable<any[]> {
    return new Observable((observer) => {
      this.getTargetAreas().subscribe((data) => {
        console.log('Loaded target areas:', data.target_areas);
        this.targetAreasCatalog = data.target_areas;
        observer.next(data.target_areas);
        observer.complete();
      });
    });
  }

  /**
   * Map frontend area (name or id) to backend id using loaded catalog
   */
  private mapTargetArea(area: any): number {
    if (typeof area === 'number') return area;
    const found = this.targetAreasCatalog.find((a: any) => a.name === area);
    return found ? found.id : 0;
  }

  private mapDay(day: any): string {
    // Example: 'LUN' => 'Lunes', 'MIÉ' => 'Miércoles', etc.
    switch (day) {
      case 'LUN':
        return 'Lunes';
      case 'MAR':
        return 'Martes';
      case 'MIÉ':
        return 'Miércoles';
      case 'JUE':
        return 'Jueves';
      case 'VIE':
        return 'Viernes';
      case 'SÁB':
        return 'Sábado';
      case 'DOM':
        return 'Domingo';
      default:
        return day;
    }
  }

  // 4. Update a Routine
  updateRoutine(id: number | string, routine: any): Observable<any> {
    const mappedRoutine = this.mapRoutineToBackend(routine);
    return this.http.put(
      `${environment.BASE_URL}/routines/${id}`,
      mappedRoutine,
      { headers: this.getAuthHeaders() }
    );
  }

  // 5. Delete a Routine
  deleteRoutine(id: number | string): Observable<any> {
    return this.http.delete(`${environment.BASE_URL}/routines/${id}`, {
      headers: this.getAuthHeaders(),
    });
  }

  // 6. Get All Videos
  getAllVideos(): Observable<any> {
    return this.http.get(`${environment.BASE_URL}/videos`, {
      headers: this.getAuthHeaders(),
    });
  }

  getAllVideosCached(): Observable<any[]> {
    if (this.videosCache.length > 0) {
      return new Observable((observer) => {
        observer.next(this.videosCache);
        observer.complete();
      });
    } else {
      return new Observable((observer) => {
        this.getAllVideos().subscribe((data) => {
          this.videosCache = data.videos || [];
          observer.next(this.videosCache);
          observer.complete();
        });
      });
    }
  }

  refreshVideosCache(): Observable<any[]> {
    return new Observable((observer) => {
      this.getAllVideos().subscribe((videos) => {
        this.videosCache = videos || [];
        observer.next(this.videosCache);
        observer.complete();
      });
    });
  }
}
