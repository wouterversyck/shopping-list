import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login.component';
import { CommonModule } from '@angular/common';
import { AppModule } from '@app/app.module';
import { MaterialModule } from '@core/material/material.module';
import { RouterTestingModule } from '@angular/router/testing';
import * as assert from 'assert';
import { By } from '@angular/platform-browser';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let userName: any;
  let password: any;
  let loginBtn: any;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
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
});
