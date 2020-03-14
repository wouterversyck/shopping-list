import { async, ComponentFixture, inject, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { AuthenticationService } from '@core/services/authentication/authentication.service';
import { Router } from '@angular/router';
import createSpy = jasmine.createSpy;

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  afterEach(() => {
    fixture.destroy();
  });
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      providers: [
        { provide: AuthenticationService, useValue: { isLoggedIn: () => false } },
        { provide: Router, useValue: { } },
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should redirect to home page when user is already logged in',
    inject([AuthenticationService, Router],
      (authenticationService: AuthenticationService, router: Router) => {
      router.navigate = createSpy();
      authenticationService.isLoggedIn = createSpy().and.returnValue(true);

      fixture.detectChanges();

      expect(router.navigate).toHaveBeenCalledWith(['']);
    })
  );

  it('should not redirect user that are not logged in',
    inject([AuthenticationService, Router],
      (authenticationService: AuthenticationService, router: Router) => {
        router.navigate = createSpy();
        authenticationService.isLoggedIn = createSpy().and.returnValue(false);

        fixture.detectChanges();

        expect(router.navigate).not.toHaveBeenCalled();
      })
  );
});
