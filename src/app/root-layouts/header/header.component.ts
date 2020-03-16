import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AuthenticationService } from '@core/services/authentication/authentication.service';
import { Router } from '@angular/router';
import { ThemeService } from '@core/services/theme/theme.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Output() menuClickedEvent = new EventEmitter();
  constructor(private authenticationService: AuthenticationService, private router: Router, private themeService: ThemeService) { }

  ngOnInit(): void {}

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['login']);
  }

  toggleTheme() {
    this.themeService.toggleTheme();
  }

  get isLoggedIn(): boolean {
    return this.authenticationService.isLoggedIn();
  }

  get isDarTheme(): boolean {
    return this.themeService.isDarkTheme();
  }
}
