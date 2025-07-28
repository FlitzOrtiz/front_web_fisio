import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environment';

@Injectable({ providedIn: 'root' })
export class UserService {
  private userCache: any = null;
  private readonly baseUrl = `${environment.apiUrl}/api/account`;

  constructor(private readonly http: HttpClient) {}

  updateAccount(data: any): Observable<any> {
    const token = localStorage.getItem('accessToken');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });

    return this.http.patch(this.baseUrl, data, { headers });
  }

  changePassword(
    currentPassword: string,
    newPassword: string
  ): Observable<any> {
    const token = localStorage.getItem('accessToken');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });

    const body = {
      currentPassword,
      newPassword,
    };

    return this.http.post(`${this.baseUrl}/change-password`, body, { headers });
  }

  /**
   * Actualiza la foto de perfil usando el endpoint PATCH /account
   */
  updateProfilePhoto(profilePhotoBase64: string): Observable<any> {
    return this.updateAccount({ profilePhoto: profilePhotoBase64 });
  }

  /**
   * Obtiene los datos actuales del usuario autenticado
   */
  getAccount(): Observable<any> {
    const token = localStorage.getItem('accessToken');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });

    console.log('Fetching user data from server');
    return this.http.get(this.baseUrl, { headers });
  }

  /**
   * Devuelve el usuario cacheado si existe, si no hace la petición y lo cachea
   */
  getCachedAccount(): Observable<any> {
    if (this.userCache) {
      return new Observable((observer) => {
        observer.next(this.userCache);
        observer.complete();
      });
    } else {
      return new Observable((observer) => {
        this.getAccount().subscribe({
          next: (user) => {
            console.log('Caching user data:', user);
            this.userCache = user;
            observer.next(user);
            observer.complete();
          },
          error: (err) => observer.error(err),
        });
      });
    }
  }

  /**
   * Limpia el cache del usuario (llamar tras actualizar datos)
   */
  clearUserCache() {
    this.userCache = null;
  }
}
