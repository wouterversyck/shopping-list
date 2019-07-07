import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http: HttpClient) { }

  login(username: string, password: string) {
    const formData = new FormData();
    formData.append('scope', 'write');
    formData.append('grant_type', 'client_credentials');

    this.http.post('localhost:8080/oauth/token', formData, {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${btoa(`${username}:${password}`)}`
      })
    }).subscribe(response => console.log(response));
  }
}
