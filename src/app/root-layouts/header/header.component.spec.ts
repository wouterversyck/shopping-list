import { async, ComponentFixture, inject, TestBed } from '@angular/core/testing';

import { HeaderComponent } from './header.component';
import { AuthenticationService } from '@core/services/authentication/authentication.service';
import { By } from '@angular/platform-browser';
import createSpy = jasmine.createSpy;
import { Router } from '@angular/router';
import { MaterialModule } from '@app/modules/material/material.module';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MaterialModule,
        NoopAnimationsModule
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        { provide: AuthenticationService, useValue: { isLoggedIn: () => true } },
        { provide: Router, useValue: {}}
      ],
      declarations: [ HeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call logout function when logout button is clicked',
    inject([AuthenticationService],
      (authService: AuthenticationService) => {

      authService.isLoggedIn = createSpy().and.returnValue(true);
      fixture.detectChanges();
      expect(component.isLoggedIn).toBeTruthy();

      spyOn(component, 'logout');

      fixture.debugElement.query(By.css('.menu_trigger')).nativeElement.click();
      const logoutBtn = fixture.debugElement.query(By.css('.btn_logout')).nativeElement;
      logoutBtn.click();

      expect(component.logout).toHaveBeenCalled();
    })
  );

  it('should logout and navigate when logout function is called',
    inject([AuthenticationService, Router],
      (authService: AuthenticationService, router: Router) => {
      authService.logout = createSpy();
      authService.isLoggedIn = createSpy().and.returnValue(true);
      router.navigate = createSpy();

      component.logout();

      expect(authService.logout).toHaveBeenCalled();
      expect(router.navigate).toHaveBeenCalledWith(['login']);
    })
  );
});
