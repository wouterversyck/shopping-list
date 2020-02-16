import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private usersUrl = '/api/admin/users/';

  constructor(private http: HttpClient) { }

  getUsers(page: number, amount: number) {
    return this.http.get(`${this.usersUrl}${page}/${amount}`);
  }
}
