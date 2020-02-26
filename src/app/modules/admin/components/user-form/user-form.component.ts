import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import { UserService } from '@core/services/user/user.service';
import { Role } from '@core/services/user/models/role.model';
import { HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CustomValidators } from '@core/validators/custom.validator';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {
  userForm = new FormGroup({
    username: new FormControl('', {
      updateOn: 'blur',
      validators: [Validators.required],
      asyncValidators: [CustomValidators.apiValidation('usernameExists', this.userService.usernameExists)]
    }),
    email: new FormControl('', {
      updateOn: 'blur',
      validators: [Validators.required, Validators.email],
      asyncValidators: [CustomValidators.apiValidation('emailExists', this.userService.emailExists)]
    }),
    role: new FormControl('USER', Validators.required)
  });

  roles: Role[];
  errorMessage: string;

  constructor(private userService: UserService, private snackBar: MatSnackBar) {
    userService.getRoles().subscribe((roles: Role[]) => this.roles = roles);
  }

  ngOnInit(): void {
  }

  onSubmit() {
    this.userService.addUser(this.userForm.value)
      .subscribe(
        () => this.success(),
        (error: HttpErrorResponse) => this.handleError(error));
  }

  showMessage(message: string) {
    this.snackBar.open(message, 'Close', { duration: 5000 });
  }

  private success() {
    this.reset();
    this.showMessage('User created and mail sent');
  }

  private reset() {
    this.userForm.reset('');
    this.userForm.markAsPristine();
    this.errorMessage = null;
  }

  private handleError(error: HttpErrorResponse) {
    this.errorMessage = null;
    if (error.status === 207) {
      this.errorMessage = 'User created but mail sending failed';
    }
    this.errorMessage = 'An error occurred';
  }

  get username() {
    return this.userForm.controls.username;
  }

  get email() {
    return this.userForm.controls.email;
  }

}