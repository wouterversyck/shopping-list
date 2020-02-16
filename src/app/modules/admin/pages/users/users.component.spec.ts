import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersComponent } from './users.component';
import { UserService } from '@core/services/user/user.service';
import { CommonModule } from '@angular/common';
import { AppModule } from '@app/app.module';
import { MaterialModule } from '@core/material/material.module';
import { RouterTestingModule } from '@angular/router/testing';

describe('UsersComponent', () => {
  let component: UsersComponent;
  let fixture: ComponentFixture<UsersComponent>;

  afterEach(() => {
    fixture.destroy();
  });
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsersComponent ],
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
    fixture = TestBed.createComponent(UsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
