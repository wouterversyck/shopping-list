import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '@core/services/user/user.service';
import { Role } from '@core/services/user/models/role.model';
import { HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { pipe } from 'rxjs';
import { debounce, debounceTime, flatMap } from 'rxjs/operators';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {
  userForm = new FormGroup({
    username: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    role: new FormControl('USER')
  });

  roles: Role[];
  errorMessage: string;

  constructor(private userService: UserService, private snackBar: MatSnackBar) {
    userService.getRoles().subscribe((roles: Role[]) => this.roles = roles);
  }

  ngOnInit(): void {
    this.userForm.get("email").valueChanges
      .pipe(
        debounceTime(1000),
        flatMap(value => this.userService.emailExists(value))
      ).subscribe((value) => console.log(value))
  }

  onSubmit() {
    this.userService.addUser(this.userForm.value)
      .subscribe(
        () => this.success(),
        (error: HttpErrorResponse) => this.handleError(error));
  }

  private success() {
    this.reset();
    this.snackBar.open('User created and mail sent', 'Close', {duration: 5000});
  }

  private reset() {
    this.userForm.reset('');
    this.errorMessage = null;
  }

  private handleError(error: HttpErrorResponse) {
    this.errorMessage = null;
    if(error.status === 207) {
      this.errorMessage = "User created but mail sending failed";
    }
    this.errorMessage = "An error occurred";
  }

  get username() {
    return this.userForm.controls.username;
  }

  get email() {
    return this.userForm.controls.email;
  }

}
