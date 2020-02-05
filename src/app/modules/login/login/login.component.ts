import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '@core/services/authentication/services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  userForm = new FormGroup({
    userName: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  });

  showLoginError = false;

  constructor(private router: Router, private authenticationService: AuthenticationService) { }

  ngOnInit() {
  }

  onSubmit() {
    this.showLoginError = false;
    this.authenticationService.login(this.userName.value, this.password.value)
      .subscribe(
        x => this.router.navigate(['']),
        error => this.showLoginError = true);
  }

  get userName() {
    return this.userForm.controls.userName;
  }

  get password() {
    return this.userForm.controls.password;
  }
}
