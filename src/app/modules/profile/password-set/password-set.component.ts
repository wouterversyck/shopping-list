import { Component, OnDestroy, OnInit } from '@angular/core';
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
export class PasswordSetComponent implements OnInit, OnDestroy {
  progressBarColor = 'warn';

  userForm = new FormGroup({
    password: new FormControl('', [Validators.required, CustomValidators.passwordStrength()]),
    confirmPassword: new FormControl('', Validators.required)
  }, {
    validators: CustomValidators.passwordsMatch('password', 'confirmPassword')
  });

  private token: string;

  private alive = true;

  constructor(
    private snackBarService: SnackBarService,
    private router: Router,
    private route: ActivatedRoute,
    private profileService: ProfileService) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.token = params.token;
    });

    this.password.valueChanges.subscribe(e => {
      this.progressBarColor = this.passwordStrength === 100 ? 'accent' : 'warn';
    });
  }

  ngOnDestroy(): void {
    this.alive = false;
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

  private amountOfPasswordStrengthErrors(errors): number {
    return Object.keys(errors)
      .filter((key) => (errors[key])).length;
  }

  private totalAmountOfPasswordStrengthChecks(errors): number {
    return Object.keys(errors).length;
  }

  get passwordStrength() {
    const totalChecks = this.totalAmountOfPasswordStrengthChecks(this.passwordStrengthErrors);
    const unit = 100 / this.totalAmountOfPasswordStrengthChecks(this.passwordStrengthErrors);
    return unit * (totalChecks - this.amountOfPasswordStrengthErrors(this.passwordStrengthErrors));
  }

  get password() {
    return this.userForm.controls.password;
  }

  get passwordStrengthErrors() {
    return this.password.errors.passwordStrengthErrors;
  }

  get confirmPassword() {
    return this.userForm.controls.confirmPassword;
  }
}
