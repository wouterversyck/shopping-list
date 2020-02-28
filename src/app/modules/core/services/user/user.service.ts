import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { User } from '@core/services/user/models/user.model';
import { Observable } from 'rxjs';
import { Role } from '@core/services/user/models/role.model';
import { UserPage } from '@core/services/user/models/UserPage.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private adminEndpoint = '/api/admin/';
  private usersUrl = `${this.adminEndpoint}users/`;
  private rolesUrl = `${this.adminEndpoint}roles/`;

  constructor(private http: HttpClient) { }

  getUsers(page: number = 0, size: number = 25): Observable<UserPage> {
    return this.http.get<UserPage>(`${this.usersUrl}?page=${page}&size=${size}`);
  }

  addUser(user: User): Observable<HttpResponse<User>> {
    return this.http.post<User>(this.usersUrl, user, { observe: 'response' });
  }

  getRoles(): Observable<Role[]> {
    return this.http.get<Role[]>(this.rolesUrl);
  }

  usernameExists = (username: string): Observable<boolean> => {
    return this.http.get<boolean>(`${this.usersUrl}exists?username=${username}`);
  }

  emailExists = (email: string): Observable<boolean> => {
    return this.http.get<boolean>(`${this.usersUrl}exists?email=${email}`);
  }

  sendPasswordSetMail(id: number) {
    return this.http.get(`${this.usersUrl}passwordSet/${id}`);
  }
}
