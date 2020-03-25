import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import { UserService } from '@core/services/user/user.service';
import { Role } from '@core/services/user/models/role.model';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { CustomValidators } from '@core/validators/custom.validator';
import { MatDialogRef } from '@angular/material/dialog';
import { SnackBarService } from '@core/services/snack-bar/snack-bar.service';
import { User } from '@core/services/user/models/user.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {
  userForm = new FormGroup({
    username: new FormControl('', {
      updateOn: 'blur',
      validators: [
        Validators.required, Validators.pattern(/^[a-zA-Z0-9]+$/), Validators.maxLength(25)],
      asyncValidators: [
        CustomValidators.apiValidation('usernameExists', this.userService.usernameExists)]
    }),
    email: new FormControl('', {
      updateOn: 'blur',
      validators: [Validators.required, Validators.email],
      asyncValidators: [CustomValidators.apiValidation('emailExists', this.userService.emailExists)]
    }),
    role: new FormControl('', Validators.required)
  });

  roles: Observable<Role[]>;
  errorMessage: string;

  constructor(private userService: UserService, private snackBar: SnackBarService, private dialogRef: MatDialogRef<UserFormComponent>) {
  }

  ngOnInit(): void {
    this.roles = this.userService.getRoles();
  }

  onSubmit() {
    this.userService.addUser(this.userForm.value)
      .subscribe(
        (response: HttpResponse<User>) => this.success(response),
        (error: HttpErrorResponse) => this.handleError(error));
  }

  private success(response: HttpResponse<User>) {
    if (response.status === 207) {
      this.snackBar.showMessage('User created but mail sending failed');
    } else {
      this.snackBar.showMessage('User created and mail sent');
    }
    this.dialogRef.close();
  }

  private handleError(error: HttpErrorResponse) {
    this.snackBar.showMessage('An error occurred while creating the user');
  }

  get username() {
    return this.userForm.controls.username;
  }

  get email() {
    return this.userForm.controls.email;
  }

}
