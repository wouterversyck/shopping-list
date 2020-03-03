import { TestBed, inject } from '@angular/core/testing';

import { LoginGuard } from './login.guard';
import { AuthenticationService } from '@core/services/authentication/authentication.service';
import { Router } from '@angular/router';
import createSpy = jasmine.createSpy;

describe('LoginGuard', () => {
  const activatedRouteSnapshotMock: any = {
    snapshot: {},
    data: {
      authGuardRedirect: 'test'
    }
  };
  const routeStateMock: any = {
    snapshot: {},
    url: '/cookies'
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        LoginGuard,
        { provide: AuthenticationService, useValue: {} },
        { provide: Router, useValue: {}}
      ]
    });
  });

  it('should return true when user is logged in',
    inject([LoginGuard, AuthenticationService],
    (guard: LoginGuard, authService: AuthenticationService) => {

      authService.isLoggedIn = createSpy().and.returnValue(true);

      expect(guard.canActivate(activatedRouteSnapshotMock, routeStateMock)).toBeTruthy();
    })
  );

  it('should return false and redirect when user is not logged in',
    inject([LoginGuard, AuthenticationService, Router],
    (guard: LoginGuard, authService: AuthenticationService, router: Router) => {

      authService.isLoggedIn = createSpy().and.returnValue(false);
      router.navigate = createSpy();

      expect(guard.canActivate(activatedRouteSnapshotMock, routeStateMock)).toBeFalsy();
      expect(router.navigate).toHaveBeenCalledWith(['test']);
  }));
});
