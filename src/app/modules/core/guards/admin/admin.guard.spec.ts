import {inject, TestBed} from '@angular/core/testing';

import { AdminGuard } from './admin.guard';
import { AuthenticationService} from '@core/services/authentication/authentication.service';
import { Router } from '@angular/router';
import createSpy = jasmine.createSpy;

describe('AdminGuard', () => {
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
        AdminGuard,
        { provide: AuthenticationService, useValue: {} },
        { provide: Router, useValue: {}}
      ]
    });
  });

  it('should return true when user has admin role',
    inject([AdminGuard, AuthenticationService],
    (guard: AdminGuard, authService: AuthenticationService) => {
      authService.isAdmin = createSpy().and.returnValue(true);

      expect(guard.canActivate(activatedRouteSnapshotMock, routeStateMock)).toBeTruthy();
    })
  );

  it('should return false and redirect when user does not have the admin role',
    inject([AdminGuard, AuthenticationService, Router],
      (guard: AdminGuard, authService: AuthenticationService, router: Router) => {
        authService.isAdmin = createSpy().and.returnValue(false);
        router.navigate = createSpy();

        expect(guard.canActivate(activatedRouteSnapshotMock, routeStateMock)).toBeFalsy();
        expect(router.navigate).toHaveBeenCalledWith(['test']);
    })
  );
});
