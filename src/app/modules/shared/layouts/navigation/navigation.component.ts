import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '@core/services/authentication/authentication.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {

  constructor(private authenticationService: AuthenticationService) { }

  ngOnInit(): void {
  }

  get isAdmin() {
    return this.authenticationService.isAdmin();
  }

}
