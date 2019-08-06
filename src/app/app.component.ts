import { Component } from '@angular/core';
import { AuthenticationService } from '@core/services/authentication/authentication.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  title = 'shopping-list';

  constructor(private authenticationService: AuthenticationService, private router: Router, private httpService: HttpClient) {
    httpService.get('api/test').subscribe();
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['login']);
  }

  get isLoggedIn() {
    return this.authenticationService.isLoggedIn();
  }
}
