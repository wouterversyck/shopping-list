import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
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
    return this.http.post<Response>('/api/login', loginRequest, { observe: 'response' })
      .pipe(
        tap(
          response => this.setToken(response)
        )
      );
  }

  isLoggedIn() {
    if (this.jwtHelper.isTokenExpired()) {
      this.logout();
      return false;
    }
    return true;
  }

  isAdmin() {
    const token = this.jwtHelper.decodeToken(this.jwtHelper.tokenGetter());
    return this.tokenIncludesRole(token);
  }

  logout() {
    localStorage.removeItem('access_token');
  }

  signInWithGoogle(idToken: string) {
    return this.http.post<Response>('/api/oauth/google', { idToken }, { observe: 'response' })
      .pipe(
        tap(
          response => this.setToken(response)
        )
      );
  }

  private tokenIncludesRole(token) {
    return token && token.roles && token.roles.includes('ADMIN');
  }

  private setToken(response: HttpResponse<Response>) {
    const token = response.headers.get('X-Token');
    if (response.status === 200 && token) {
      localStorage.setItem('access_token', token);
    }
  }
}
