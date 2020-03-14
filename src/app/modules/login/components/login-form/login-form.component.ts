import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '@core/services/authentication/authentication.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {

  userForm = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  });

  showPassword = false;
  showLoginError = false;

  constructor(private router: Router, private authenticationService: AuthenticationService) { }

  ngOnInit() {
    if (this.authenticationService.isLoggedIn()) {
      this.router.navigate(['']);
    }
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
