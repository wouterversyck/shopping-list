import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthResponse } from './auth-response'

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http: HttpClient) { }

  login(username: string, password: string) {
    const formData = new FormData();
    formData.append('scope', 'write');
    formData.append('grant_type', 'client_credentials');

    this.http.post('/oauth/token', formData, {
      headers: new HttpHeaders({
        'Authorization': `Basic ${btoa(`${username}:${password}`)}`,
      })
    }).subscribe(
      (response: AuthResponse) => localStorage.setItem('access_token', response.access_token)
    );
  }

  logout() {
    localStorage.removeItem('access_token');
  }
}
