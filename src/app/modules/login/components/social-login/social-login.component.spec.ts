import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SocialLoginComponent } from './social-login.component';
import { AuthenticationService } from '@core/services/authentication/authentication.service';
import { Router } from '@angular/router';
import { AuthService } from 'angularx-social-login';
import { of } from 'rxjs';
import { SnackBarService } from '@core/services/snack-bar/snack-bar.service';

describe('SocialLoginComponent', () => {
  let component: SocialLoginComponent;
  let fixture: ComponentFixture<SocialLoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SocialLoginComponent ],
      providers: [
        { provide: AuthenticationService, useValue: { isLoggedIn: () => false } },
        { provide: Router, useValue: { } },
        { provide: AuthService, useValue: { authState: of({ idToken: '' }) } },
        { provide: SnackBarService, useValue: { showMessage: () => '' }}
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SocialLoginComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });
});
