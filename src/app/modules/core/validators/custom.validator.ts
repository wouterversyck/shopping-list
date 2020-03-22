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

  static patternForKey(pattern, key: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      return (control.value as string).match(pattern) ? null : { [key]: true };
    };
  }
}
