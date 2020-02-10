import {TestBed, async, inject, ComponentFixture} from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { MaterialModule } from '@core/material/material.module';
import { JwtHelperService, JwtModule } from '@auth0/angular-jwt';
import { By } from '@angular/platform-browser';
import { AuthenticationService } from '@core/services/authentication/services/authentication.service';
import { Router } from '@angular/router';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  afterEach(() => {
    fixture.destroy();
  });
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        MaterialModule,
        JwtModule.forRoot({
          config: {
            tokenGetter: () => {
              return '';
            }
          }
        })
      ],
      providers: [
        JwtHelperService,
        AuthenticationService
      ],
      declarations: [
        AppComponent
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app',
    inject([HttpTestingController], () => {
      expect(component).toBeTruthy();
    }))
  ;

  it(`should have as title 'shopping-list'`, () => {
    expect(component.title).toEqual('shopping-list');
  });

  it('should render title in a h1 tag', () => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('Shopping list');
  });

  it('should logout and navigate when logout function is called',
    inject([AuthenticationService, Router],
      (authService: AuthenticationService, router: Router) => {

      spyOn(authService, 'logout');
      spyOn(router, 'navigate');

      component.logout();

      expect(authService.logout).toHaveBeenCalled();
      expect(router.navigate).toHaveBeenCalledWith(['login']);
  }));

  it('should call logout function when logout button is clicked',
    inject([AuthenticationService],
      (authService: AuthenticationService) => {
        spyOn(authService, 'isLoggedIn').and.returnValue(true);
        fixture.detectChanges();
        expect(component.isLoggedIn).toBeTruthy();

        spyOn(component, 'logout');

        const logoutBtn = fixture.debugElement.query(By.css('.mat-raised-button')).nativeElement;
        logoutBtn.click();

        expect(component.logout).toHaveBeenCalled();
  }));
});
