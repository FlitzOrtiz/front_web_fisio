import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class PatientService {
  private baseUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('accessToken');
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
  }

  getChronicDiseases(): Observable<any> {
    return this.http.get(`${this.baseUrl}/patient/catalog/chronic-diseases`, {
      headers: this.getAuthHeaders(),
    });
  }

  getAffectedZones(): Observable<any> {
    return this.http.get(`${this.baseUrl}/patient/catalog/affected-zones`, {
      headers: this.getAuthHeaders(),
    });
  }

  getLesionTypes(): Observable<any> {
    return this.http.get(`${this.baseUrl}/patient/catalog/lesion-types`, {
      headers: this.getAuthHeaders(),
    });
  }

  getPatientProfile(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/patient/profile/${id}`, {
      headers: this.getAuthHeaders(),
    });
  }

  createOrUpdatePatientProfile(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/patient/profile`, data, {
      headers: this.getAuthHeaders(),
    });
  }

  getAllPatientProfiles(): Observable<any> {
    return this.http.get(`${this.baseUrl}/patient/profiles`, {
      headers: this.getAuthHeaders(),
    });
  }

  deleteRoutineAssignment(
    patientProfileId: number,
    routineSessionId: number
  ): Observable<any> {
    return this.http.post(
      `${this.baseUrl}/patient/routine/delete`,
      { patientProfileId, routineSessionId },
      { headers: this.getAuthHeaders() }
    );
  }
}
