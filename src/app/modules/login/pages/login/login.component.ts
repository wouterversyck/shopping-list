import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '@core/services/authentication/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  userForm = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  });

  showPassword = false;
  showLoginError = false;

  constructor(private router: Router, private authenticationService: AuthenticationService) { }

  ngOnInit() {
  }

  onSubmit() {
    this.showLoginError = false;
    const username: string = (this.username.value as string).trim();
    const password: string = (this.password.value as string).trim();
    this.authenticationService.login(username, password)
      .subscribe(
        x => this.router.navigate(['']),
        error => this.showLoginError = true);
  }

  get username() {
    return this.userForm.controls.username;
  }

  get password() {
    return this.userForm.controls.password;
  }
}
