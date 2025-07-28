import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, tap, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from '../../environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly baseUrl = `${environment.apiUrl}/api/auth`;
  private readonly TOKEN_KEY = 'accessToken';
  private readonly USER_KEY = 'user';

  constructor(
    private readonly http: HttpClient,
    private readonly router: Router
  ) {}

  login(email: string, password: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/login`, { email, password }).pipe(
      tap((response) => {
        this.saveAuthData(response);
        this.router.navigate(['/dashboard']);
      }),
      catchError(this.handleLoginError)
    );
  }

  loginWithGoogle(): Observable<any> {
    return this.login('test@example.com', 'password123');
  }

  logout(): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.getAccessToken()}`,
    });

    return this.http.post(`${this.baseUrl}/logout`, {}, { headers }).pipe(
      tap(() => {
        this.clearAuthData();
        this.router.navigate(['/landing']);
      }),
      catchError((error) => {
        this.clearAuthData();
        return throwError(() => ({
          message: 'Error al cerrar sesión',
          originalError: error.error,
        }));
      })
    );
  }

  register(payload: {
    username: string;
    fullName: string;
    email: string;
    password: string;
    profilePhoto?: string;
  }): Observable<any> {
    return this.http.post('http://localhost:8080/api/account', payload);
  }

  isAuthenticated(): boolean {
    return !!this.getAccessToken();
  }

  getCurrentUser(): any {
    const user = localStorage.getItem(this.USER_KEY);
    return user ? JSON.parse(user) : null;
  }

  autoLogin(): void {
    if (this.isAuthenticated()) {
      this.router.navigate(['/dashboard']);
    }
  }

  private saveAuthData(authData: any): void {
    console.log('Saving auth data:', authData);
    localStorage.setItem(this.TOKEN_KEY, authData.accessToken);
    if (authData.user) {
      localStorage.setItem(this.USER_KEY, JSON.stringify(authData.user));
    }
    if (authData.user?.id) {
      localStorage.setItem('userId', authData.user.id.toString());
    }
  }

  private clearAuthData(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.USER_KEY);
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('userId');
    localStorage.removeItem('clave');
  }

  private getAccessToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  private handleLoginError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'Error al iniciar sesión';

    if (error.status === 400) {
      if (error.error?.error === 'Invalid email format') {
        errorMessage = 'Formato de email inválido';
      } else if (error.error?.error === 'Password is required') {
        errorMessage = 'La contraseña es requerida';
      } else if (
        error.error?.error === 'Password must be at least 6 characters'
      ) {
        errorMessage = 'La contraseña debe tener al menos 6 caracteres';
      }
    } else if (error.status === 401) {
      errorMessage = 'Email o contraseña incorrectos';
    }

    return throwError(() => ({
      message: errorMessage,
      originalError: error.error,
    }));
  }
}
