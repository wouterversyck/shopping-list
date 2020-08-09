import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigComponent } from './config.component';
import { ConfigService } from '@core/services/config/config.service';
import { Config } from '@core/services/config/models/config.model';
import { ReactiveFormsModule } from '@angular/forms';
import { SnackBarService } from '@core/services/snack-bar/snack-bar.service';
import { MaterialModule } from '@app/modules/material/material.module';

describe('ConfigComponent', () => {
  let component: ConfigComponent;
  let fixture: ComponentFixture<ConfigComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfigComponent ],
      providers: [
        { provide: ConfigService, useValue: { getConfig: () => new Config() } },
        { provide: SnackBarService, useValue: { showMessage: () => {} } }
      ],
      imports: [
        ReactiveFormsModule,
        MaterialModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
