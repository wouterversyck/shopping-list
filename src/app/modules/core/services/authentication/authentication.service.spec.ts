import {inject, TestBed} from '@angular/core/testing';

import { AuthenticationService } from './authentication.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { JwtHelperService, JwtModule } from '@auth0/angular-jwt';

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
});
