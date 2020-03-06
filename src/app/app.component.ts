import { Component } from '@angular/core';
import { AuthenticationService } from '@core/services/authentication/authentication.service';
import { Router } from '@angular/router';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'shopping-list';
  env = environment;
  constructor(private authenticationService: AuthenticationService, private router: Router) { }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['login']);
  }

  get isLoggedIn() {
    return this.authenticationService.isLoggedIn();
  }

  get isAdmin() {
    return this.authenticationService.isAdmin();
  }
}
