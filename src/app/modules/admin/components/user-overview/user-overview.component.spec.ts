import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserOverviewComponent } from './user-overview.component';
import { UserService } from '@core/services/user/user.service';
import { CommonModule } from '@angular/common';
import { AppModule } from '@app/app.module';
import { MaterialModule } from '@core/material/material.module';
import { RouterTestingModule } from '@angular/router/testing';

describe('UserOverviewComponent', () => {
  let component: UserOverviewComponent;
  let fixture: ComponentFixture<UserOverviewComponent>;

  afterEach(() => {
    fixture.destroy();
  });
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserOverviewComponent ],
      providers: [ UserService ],
      imports: [
        CommonModule,
        AppModule,
        MaterialModule,
        RouterTestingModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});