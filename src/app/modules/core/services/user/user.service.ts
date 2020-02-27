import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '@core/services/user/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private adminEndpoint = '/api/admin/';
  private usersUrl = `${this.adminEndpoint}users/`;
  private rolesUrl = `${this.adminEndpoint}roles/`;

  constructor(private http: HttpClient) { }

  getUsers(page: number = 0, size: number = 25) {
    return this.http.get(`${this.usersUrl}?page=${page}&size=${size}`);
  }

  addUser(user: User) {
    return this.http.post(this.usersUrl, user);
  }

  getRoles() {
    return this.http.get(this.rolesUrl);
  }

  usernameExists = (username: string) => {
    return this.http.get(`${this.usersUrl}exists?username=${username}`);
  }

  emailExists = (email: string) => {
    return this.http.get(`${this.usersUrl}exists?email=${email}`);
  }

  sendPasswordSetMail(id: number) {
    return this.http.get(`${this.usersUrl}passwordSet/${id}`);
  }
}
