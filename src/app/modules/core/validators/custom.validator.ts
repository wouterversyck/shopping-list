import { Observable } from 'rxjs';
import { AbstractControl, AsyncValidatorFn, FormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';
import { map } from 'rxjs/operators';

export class CustomValidators {
  static apiValidation(key: string, serviceFunction: (value: string) => Observable<boolean>): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      return serviceFunction(control.value).pipe(
        map(response => response ? { [key]: true } : null)
      );
    };
  }

  static passwordsMatch(firstInput: string, secondInput: string): ValidatorFn {
    return (group: FormGroup): ValidationErrors | null => {
      const password = group.get(firstInput).value;
      const confirmPass = group.get(secondInput).value;

      return password === confirmPass ? null : { passwordsDoNotMatch: true };
    };
  }

  static passwordStrength(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value as string;
      const containsSpecialCharExpression = /^(?=.*?[" !"#$%&'()*+,-./:;<=>?@[\]^_`{|}~"])/;
      const containsAtLeastOneLowerCaseExpression = /^(?=.*?[a-z])/;
      const containsAtLeastOneUpperCaseExpression = /^(?=.*?[A-Z])/;
      const containsAtLeastOneDigitExpression = /^(?=.*?[0-9])/;
      const minimumLengthExpression = /^.{8,}$/;

      const errors = {
        passwordStrengthErrors: {
          containsDigit: false,
          containsLowerCase: false,
          containsUpperCase: false,
          containsSpecialChar: false,
          minimumLength: false
        }
      };

      if (!value.match(containsAtLeastOneDigitExpression)) {
        errors.passwordStrengthErrors.containsDigit = true;
      }
      if (!value.match(containsAtLeastOneLowerCaseExpression)) {
        errors.passwordStrengthErrors.containsLowerCase = true;
      }
      if (!value.match(containsAtLeastOneUpperCaseExpression)) {
        errors.passwordStrengthErrors.containsUpperCase = true;
      }
      if (!value.match(containsSpecialCharExpression)) {
        errors.passwordStrengthErrors.containsSpecialChar = true;
      }
      if (!value.match(minimumLengthExpression)) {
        errors.passwordStrengthErrors.minimumLength = true;
      }

      return errors;
    };
  }
}
