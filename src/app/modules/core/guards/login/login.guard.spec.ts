import { TestBed, async, inject } from '@angular/core/testing';

import { LoginGuard } from './login.guard';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { JwtHelperService, JwtModule } from '@auth0/angular-jwt';
import { AuthenticationService } from '@core/services/authentication/authentication.service';
import { Router } from '@angular/router';

describe('LoginGuard', () => {
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
        LoginGuard,
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

  it('should return true when user is logged in',
    inject([LoginGuard, AuthenticationService],
    (guard: LoginGuard, authService: AuthenticationService) => {

    spyOn(authService, 'isLoggedIn').and.returnValue(true);

    expect(guard.canActivate(routeMock, routeStateMock)).toBeTruthy();
  }));

  it('should return false and redirect when user is not logged in',
    inject([LoginGuard, AuthenticationService, Router],
    (guard: LoginGuard, authService: AuthenticationService, router: Router) => {

      spyOn(authService, 'isLoggedIn').and.returnValue(false);
      spyOn(router, 'navigate');

      expect(guard.canActivate(routeMock, routeStateMock)).toBeFalsy();
      expect(router.navigate).toHaveBeenCalledWith(['test']);
  }));
});
