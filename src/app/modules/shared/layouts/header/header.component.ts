import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AuthenticationService } from '@core/services/authentication/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Output() menuClickedEvent = new EventEmitter();
  constructor(private authenticationService: AuthenticationService, private router: Router) { }

  ngOnInit(): void {
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['login']);
  }

  get isLoggedIn() {
    return this.authenticationService.isLoggedIn();
  }
}
