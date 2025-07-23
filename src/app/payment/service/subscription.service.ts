// src/app/services/subscription.service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SubscriptionService {
  private baseUrl = 'http://localhost:8080/api/subscription';

  constructor(private http: HttpClient) {}

  // Cambié responseType a 'text' para recibir la URL o el mensaje de error como texto
  createSubscription(userId: number, planTypeId: number): Observable<string> {
    return this.http.post(`${this.baseUrl}/create`, { userId, planTypeId }, { responseType: 'text' });
  }
}
