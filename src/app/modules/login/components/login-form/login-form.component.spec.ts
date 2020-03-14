import { async, ComponentFixture, inject, TestBed } from '@angular/core/testing';

import { LoginFormComponent } from './login-form.component';
import { AuthenticationService } from '@core/services/authentication/authentication.service';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { HttpResponse } from '@angular/common/http';
import { AuthService } from 'angularx-social-login';
import { CommonModule } from '@angular/common';
import { AppModule } from '@app/app.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '@core/material/material.module';
import { By } from '@angular/platform-browser';
import createSpy = jasmine.createSpy;

describe('LoginFormComponent', () => {
  let component: LoginFormComponent;
  let fixture: ComponentFixture<LoginFormComponent>;

  let username: any;
  let password: any;
  let loginBtn: any;

  afterEach(() => {
    fixture.destroy();
  });
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginFormComponent ],
      providers: [
        { provide: AuthenticationService, useValue: { isLoggedIn: () => false } },
        { provide: Router, useValue: { } },
        { provide: AuthService, useValue: { authState: of({ idToken: '' }) } }
      ],
      imports: [
        CommonModule,
        AppModule,
        ReactiveFormsModule,
        MaterialModule
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    username = fixture.debugElement.query(By.css('[formcontrolname=username]')).nativeElement;
    password = fixture.debugElement.query(By.css('[formcontrolname=password]')).nativeElement;
    loginBtn = fixture.debugElement.query(By.css('button[type=submit]')).nativeElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('should have an invalid form and disable loginButton when form is empty', () => {
    expect(loginBtn.disabled).toBeTruthy();
    expect(component.userForm.valid).toBeFalsy();
  });

  it('should have an valid form and enabled loginButton when username and password are entered', () => {
    username.value = 'john';
    password.value = 'password';
    username.dispatchEvent(new Event('input'));
    password.dispatchEvent(new Event('input'));

    fixture.detectChanges();

    expect(loginBtn.disabled).toBeFalsy();
    expect(component.userForm.valid).toBeTruthy();
  });

  it('should call onsubmit when login button is clicked', () => {
    username.value = 'john';
    password.value = 'password';
    username.dispatchEvent(new Event('input'));
    password.dispatchEvent(new Event('input'));

    spyOn(component, 'onSubmit');

    fixture.detectChanges();
    loginBtn.click();

    expect(component.onSubmit).toHaveBeenCalled();
  });

  it('should login with username and password and redirect when form is submitted',
    inject([AuthenticationService, Router],
      (authService: AuthenticationService, router: Router) => {
      component.userForm.controls.username.setValue('username');
      component.userForm.controls.password.setValue('password');

      authService.login = createSpy().and.returnValue(of(new HttpResponse()));
      router.navigate = createSpy();

      component.onSubmit();

      expect(authService.login).toHaveBeenCalledWith('username', 'password');
      expect(router.navigate).toHaveBeenCalledWith(['']);
    })
  );
});
