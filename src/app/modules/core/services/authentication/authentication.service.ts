import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthResponse } from './models/auth-response';
import { JwtHelperService } from '@auth0/angular-jwt';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http: HttpClient, private jwtHelper: JwtHelperService) { }

  login(username: string, password: string) {
    const formData = new FormData();
    formData.append('scope', 'write');
    formData.append('grant_type', 'client_credentials');

    return this.http.post('/oauth/token', formData, {
      headers: new HttpHeaders({
        'Authorization': `Basic ${btoa(`${username}:${password}`)}`,
      })
    }).pipe(
      tap(
        (response: AuthResponse) => localStorage.setItem('access_token', response.access_token)
      )
    );
  }

  isLoggedIn() {
    return !this.jwtHelper.isTokenExpired();
  }

  logout() {
    localStorage.removeItem('access_token');
  }
}
