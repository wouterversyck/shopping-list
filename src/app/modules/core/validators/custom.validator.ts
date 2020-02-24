import { Observable } from 'rxjs';
import { AbstractControl, AsyncValidatorFn, ValidationErrors } from '@angular/forms';
import { map } from 'rxjs/operators';

export class CustomValidators {
  static apiValidation(key: string, serviceFunction: (value: string) => Observable<object>): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      return serviceFunction(control.value).pipe(
        map(response => response ? { [key]: true } : null)
      );
    };
  }
}
