import { TestBed } from '@angular/core/testing';

import { ErrorHandlerInterceptor } from './error-handler.interceptor';
import { SnackBarService } from '@core/services/snack-bar/snack-bar.service';

describe('ErrorHandlerInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      ErrorHandlerInterceptor,
      { provide: SnackBarService, useValue: { showMessage: (message: string) => {} }}
    ]
  }));

  it('should be created', () => {
    const interceptor: ErrorHandlerInterceptor = TestBed.inject(ErrorHandlerInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
