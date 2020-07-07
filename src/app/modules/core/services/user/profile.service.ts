import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PasswordSet } from '@core/services/user/models/password-set.model';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private profileEndpoint = 'api/pwd';

  constructor(private http: HttpClient) { }

  updatePassword(request: PasswordSet) {
    return this.http.put(this.profileEndpoint, request);
  }
}
