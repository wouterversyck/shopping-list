import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProfileService } from '@core/services/user/profile.service';
import { PasswordSet } from '@core/services/user/models/password-set.model';
import { SnackBarService } from '@core/services/snack-bar/snack-bar.service';
import { CustomValidators } from '@core/validators/custom.validator';

@Component({
  selector: 'app-password-set',
  templateUrl: './password-set.component.html',
  styleUrls: ['./password-set.component.scss']
})
export class PasswordSetComponent implements OnInit {

  userForm = new FormGroup({
    password: new FormControl('', Validators.required),
    confirmPassword: new FormControl('', Validators.required)
  }, {
    validators: CustomValidators.passwordsMatchValidation('password', 'confirmPassword')
  });

  private token: string;

  constructor(
    private snackBarService: SnackBarService,
    private router: Router,
    private route: ActivatedRoute,
    private profileService: ProfileService) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.token = params.token;
    });
  }

  onSubmit() {
    const request = new PasswordSet();
    request.password = this.password.value;
    request.token = this.token;
    this.profileService.updatePassword(request)
      .subscribe(
        success => this.router.navigate(['']),
        error => this.snackBarService.showMessage('Token was invalid')
      );
  }

  get password() {
    return this.userForm.controls.password;
  }

  get confirmPassword() {
    return this.userForm.controls.confirmPassword;
  }
}
