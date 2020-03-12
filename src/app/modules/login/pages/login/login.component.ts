import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '@core/services/authentication/authentication.service';
import { Router } from '@angular/router';
import { AuthService, GoogleLoginProvider, SocialUser } from 'angularx-social-login';
import { SnackBarService } from '@core/services/snack-bar/snack-bar.service';
import { HttpErrorResponse } from '@angular/common/http';
import { first } from 'rxjs/operators';

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

  user: SocialUser;

  constructor(
    private snackBar: SnackBarService,
    private router: Router,
    private authService: AuthService,
    private authenticationService: AuthenticationService) { }

  ngOnInit() {
    if (this.authenticationService.isLoggedIn()) {
      this.router.navigate(['']);
      return;
    }
    this.authService.authState.pipe(first())
      .subscribe((user: SocialUser) => this.user = user);
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

  signInWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID)
      .then((user: SocialUser) => this.loginOnApiWithGoogleToken(user.idToken));
  }

  private loginOnApiWithGoogleToken(idToken: string) {
    this.authenticationService.signInWithGoogle(idToken)
      .subscribe(
        response => this.router.navigate(['/']),
        (error: HttpErrorResponse) => this.handleOauthError(error));
  }

  private handleOauthError(error: HttpErrorResponse) {
    if (error.status === 404) {
      this.snackBar.showMessage('User not found, please first activate an account');
      return;
    }
    this.snackBar.showMessage('An error occurred while authenticating with google');
  }

  private continueLoginWithUser() {
    this.loginOnApiWithGoogleToken(this.user.idToken);
  }

  get username() {
    return this.userForm.controls.username;
  }

  get password() {
    return this.userForm.controls.password;
  }
}
