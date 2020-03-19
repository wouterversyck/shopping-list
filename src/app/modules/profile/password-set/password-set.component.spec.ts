import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PasswordSetComponent } from './password-set.component';
import { provideConfig } from '@login/login.module';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { ProfileService } from '@core/services/user/profile.service';

describe('PasswordSetComponent', () => {
  let component: PasswordSetComponent;
  let fixture: ComponentFixture<PasswordSetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PasswordSetComponent ],
      providers: [
        { provide: ActivatedRoute, useValue: {queryParams: of({'token': 'token'})} },
        { provide: ProfileService, useValue: {} }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PasswordSetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
