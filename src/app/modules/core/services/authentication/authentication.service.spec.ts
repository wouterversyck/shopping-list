import {inject, TestBed} from '@angular/core/testing';

import { AuthenticationService } from './authentication.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { JwtHelperService, JwtModule } from '@auth0/angular-jwt';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { LoginRequest } from '@core/services/authentication/models/loginRequest.model';

describe('AuthenticationService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      HttpClientTestingModule,
      JwtModule.forRoot({
        config: {
          tokenGetter: () => {
            return '';
          }
        }
      })
    ],
    providers: [
      AuthenticationService,
      JwtHelperService
    ]
  }));

  it('should be created', inject([AuthenticationService],
    (service: AuthenticationService) => {
    expect(service).toBeTruthy();
  }));

  it('should return correct value and call jwtHelper when isLoggedIn is called', inject([AuthenticationService, JwtHelperService],
    (service: AuthenticationService, jwtHelperService: JwtHelperService) => {
    spyOn(jwtHelperService, 'isTokenExpired').and.returnValue(false);

    const result = service.isLoggedIn();

    expect(result).toBeTruthy();
    expect(jwtHelperService.isTokenExpired).toHaveBeenCalled();
  }));

  it('should return true when admin is logged in and isAdmin is called', inject([AuthenticationService, JwtHelperService],
    (service: AuthenticationService, jwtHelperService: JwtHelperService) => {
    const token = {
      roles: ['ADMIN']
    };

    spyOn(jwtHelperService, 'decodeToken').and.returnValue(token);

    const result = service.isAdmin();

    expect(result).toBeTruthy();
    expect(jwtHelperService.decodeToken).toHaveBeenCalled();
  }));

  it('should return false when user is logged in and isAdmin is called', inject([AuthenticationService, JwtHelperService],
    (service: AuthenticationService, jwtHelperService: JwtHelperService) => {
      const token = {
        roles: ['USER']
      };

      spyOn(jwtHelperService, 'decodeToken').and.returnValue(token);

      const result = service.isAdmin();

      expect(result).toBeFalsy();
      expect(jwtHelperService.decodeToken).toHaveBeenCalled();
    }));

  it('should remove token when logout is called', inject([AuthenticationService],
    (service: AuthenticationService) => {

    spyOn(localStorage, 'removeItem');

    service.logout();

    expect(localStorage.removeItem).toHaveBeenCalledWith('access_token');
  }));

  it('should send login details to api and set token received in response header', inject([AuthenticationService, HttpTestingController],
    (service: AuthenticationService, httpMock: HttpTestingController) => {

    spyOn(localStorage, 'setItem');

    service.login('username', 'password').subscribe();

    const req = httpMock.expectOne('/api/login');
    req.event(new HttpResponse({headers: new HttpHeaders({'X-Token': 'token'})}));

    expect(req.request.method).toEqual('POST');
    expect(req.request.body).toEqual(new LoginRequest('username', 'password'));
    expect(localStorage.setItem).toHaveBeenCalledWith('access_token', 'token');
    httpMock.verify();
  }));
});
