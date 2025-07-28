// src/app/services/subscription.service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environment';

@Injectable({
  providedIn: 'root',
})
export class SubscriptionService {
  private readonly baseUrl = `${environment.apiUrl}/api/subscription`;
  constructor(private readonly http: HttpClient) {}

  // Cambié responseType a 'text' para recibir la URL o el mensaje de error como texto
  createSubscription(userId: number, planTypeId: number): Observable<string> {
    return this.http.post(
      `${this.baseUrl}/create`,
      { userId, planTypeId },
      { responseType: 'text' }
    );
  }
}
