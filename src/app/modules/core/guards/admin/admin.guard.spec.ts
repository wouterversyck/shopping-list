import {inject, TestBed} from '@angular/core/testing';

import { AdminGuard } from './admin.guard';
import { AuthenticationService} from '@core/services/authentication/authentication.service';
import { JwtHelperService, JwtModule } from '@auth0/angular-jwt';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Router } from '@angular/router';

describe('AdminGuard', () => {
  const routeMock: any = {
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
        AuthenticationService,
        JwtHelperService
      ],
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        JwtModule.forRoot({
          config: {
            tokenGetter: () => {
              return '';
            }
          }
        })
      ]
    });
  });

  it('should return true when user has admin role',
    inject([AdminGuard, AuthenticationService],
    (guard: AdminGuard, authService: AuthenticationService) => {
      spyOn(authService, 'isAdmin').and.returnValue(true);

      expect(guard.canActivate(routeMock, routeStateMock)).toBeTruthy();
  }));

  it('should return false and redirect when user does not have the admin role',
    inject([AdminGuard, AuthenticationService, Router],
      (guard: AdminGuard, authService: AuthenticationService, router: Router) => {
      spyOn(authService, 'isAdmin').and.returnValue(false);
      spyOn(router, 'navigate');

      expect(guard.canActivate(routeMock, routeStateMock)).toBeFalsy();
      expect(router.navigate).toHaveBeenCalledWith(['test']);
  }));
});
