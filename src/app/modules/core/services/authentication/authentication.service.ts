import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { tap } from 'rxjs/operators';
import { LoginRequest } from '@core/services/authentication/models/loginRequest.model';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http: HttpClient, private jwtHelper: JwtHelperService) { }

  login(username: string, password: string) {
    const loginRequest = new LoginRequest(username, password);
    console.log('test');
    return this.http.post<Response>('/api/login', loginRequest, { observe: 'response' })
      .pipe(
        tap(
          response => localStorage.setItem('access_token', response.headers.get('X-Token'))
        )
      );
  }

  isLoggedIn() {
    return !this.jwtHelper.isTokenExpired();
  }

  isAdmin() {
    const token = this.jwtHelper.decodeToken(this.jwtHelper.tokenGetter());
    return token.roles.includes('ADMIN');
  }

  logout() {
    localStorage.removeItem('access_token');
  }
}
