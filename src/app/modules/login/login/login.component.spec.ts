import { async, ComponentFixture, inject, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login.component';
import { CommonModule } from '@angular/common';
import { AppModule } from '@app/app.module';
import { MaterialModule } from '@core/material/material.module';
import { RouterTestingModule } from '@angular/router/testing';
import * as assert from 'assert';
import { By } from '@angular/platform-browser';
import { AuthenticationService } from '@core/services/authentication/services/authentication.service';
import { of } from 'rxjs';
import { Router } from '@angular/router';
import { HttpResponse } from '@angular/common/http';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let userName: any;
  let password: any;
  let loginBtn: any;

  afterEach(() => {
    fixture.destroy();
  });
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      providers: [ AuthenticationService ],
      imports: [
        CommonModule,
        AppModule,
        ReactiveFormsModule,
        MaterialModule,
        RouterTestingModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    userName = fixture.debugElement.query(By.css('[formcontrolname=userName]')).nativeElement;
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
    userName.value = 'john';
    password.value = 'password';
    userName.dispatchEvent(new Event('input'));
    password.dispatchEvent(new Event('input'));

    fixture.detectChanges();

    expect(loginBtn.disabled).toBeFalsy();
    expect(component.userForm.valid).toBeTruthy();
  });

  it('should call onsubmit when login button is clicked', () => {
    userName.value = 'john';
    password.value = 'password';
    userName.dispatchEvent(new Event('input'));
    password.dispatchEvent(new Event('input'));

    spyOn(component, 'onSubmit');

    fixture.detectChanges();
    loginBtn.click();

    expect(component.onSubmit).toHaveBeenCalled();
  });

  it('should login with username and password and redirect when form is submitted',
    inject([AuthenticationService, Router],
      (authService: AuthenticationService, router: Router) => {
    component.userForm.controls.userName.setValue('username');
    component.userForm.controls.password.setValue('password');

    spyOn(authService, 'login').and.returnValue(of(new HttpResponse()));
    spyOn(router, 'navigate');

    component.onSubmit();

    expect(authService.login).toHaveBeenCalledWith('username', 'password');
    expect(router.navigate).toHaveBeenCalledWith(['']);
  }));
});
