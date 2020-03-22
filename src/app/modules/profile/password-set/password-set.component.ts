import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProfileService } from '@core/services/user/profile.service';
import { PasswordSet } from '@core/services/user/models/password-set.model';
import { SnackBarService } from '@core/services/snack-bar/snack-bar.service';
import { CustomValidators } from '@core/validators/custom.validator';
import { takeWhile } from 'rxjs/operators';


enum ValidationErrors {
  containsDigit = 'containsDigit',
  containsLowerCase = 'containsLowerCase',
  containsUpperCase = 'containsUpperCase',
  containsSpecialChar = 'containsSpecialChar',
  minimumLength = 'minimumLength'
}

@Component({
  selector: 'app-password-set',
  templateUrl: './password-set.component.html',
  styleUrls: ['./password-set.component.scss']
})
export class PasswordSetComponent implements OnInit, OnDestroy {
  progressBarColor = 'warn';

  userForm = new FormGroup({
    password: new FormControl('', [
      Validators.required,
      ...this.initValidatorsArray()]),
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

    this.password.valueChanges.pipe(
      takeWhile(() => this.alive)
    ).subscribe(e => {
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

  private amountOfPasswordStrengthErrors(): number {
    if (!this.password.errors) { return 0; }

    return Object.keys(this.password.errors)
      .filter(
        (e: string) => Object.values(ValidationErrors).map(val => val.toString()).includes(e)
      ).length;
  }

  private totalAmountOfPasswordStrengthChecks(): number {
    return Object.keys(ValidationErrors).length;
  }

  private initValidatorsArray() {
    return [
      CustomValidators.patternForKey(/^(?=.*?[0-9])/, ValidationErrors.containsDigit),
      CustomValidators.patternForKey(/^(?=.*?[a-z])/, ValidationErrors.containsLowerCase),
      CustomValidators.patternForKey(/^(?=.*?[" !"#$%&'()*+,-./:;<=>?@[\]^_`{|}~"])/, ValidationErrors.containsSpecialChar),
      CustomValidators.patternForKey(/^(?=.*?[A-Z])/, ValidationErrors.containsUpperCase),
      CustomValidators.patternForKey(/^.{8,}$/, ValidationErrors.minimumLength),
    ];
  }

  get passwordStrength() {
    const totalChecks = this.totalAmountOfPasswordStrengthChecks();
    const unit = 100 / totalChecks;
    return unit * (totalChecks - this.amountOfPasswordStrengthErrors());
  }

  get password() {
    return this.userForm.controls.password;
  }

  get confirmPassword() {
    return this.userForm.controls.confirmPassword;
  }

}
