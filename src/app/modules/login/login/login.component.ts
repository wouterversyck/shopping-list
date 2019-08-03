import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '@core/services/authentication/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {
  userForm = new FormGroup({
    userName: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  });
  constructor(private router: Router, private authenticationService: AuthenticationService) { }

  ngOnInit() {
  }

  onSubmit() {
    this.authenticationService.login(this.userName.value, this.password.value)
      .subscribe(x => this.router.navigate(['']));
  }

  get userName() {
    return this.userForm.controls['userName'];
  }

  get password() {
    return this.userForm.controls['password'];
  }
}
