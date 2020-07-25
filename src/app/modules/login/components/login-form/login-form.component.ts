import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '@core/services/authentication/authentication.service';
import { map, takeWhile } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit, OnDestroy {

  userForm = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  });

  showPassword = false;
  showLoginError = false;

  alive = true;

  formSub: Subscription;

  constructor(private router: Router, private authenticationService: AuthenticationService) { }

  ngOnInit() {
    // trim the values when they change
    this.formSub = this.userForm.valueChanges.pipe(
      takeWhile(() => this.alive),
      map(value => {
        value.username = (value.username as string).trim();
        value.password = (value.password as string).trim();

        return value;
      })
    ).subscribe();
  }

  onSubmit() {
    this.showLoginError = false;
    this.authenticationService.login(this.username, this.password)
      .subscribe(
        x => this.router.navigate(['']),
        error => this.showLoginError = true);
  }

  get username() {
    return this.userForm.value.username;
  }

  get password() {
    return this.userForm.value.password;
  }

  ngOnDestroy(): void {
    this.alive = false;
    this.formSub.unsubscribe();
  }
}
