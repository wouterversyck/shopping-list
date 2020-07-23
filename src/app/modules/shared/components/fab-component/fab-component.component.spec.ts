import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FabComponentComponent } from './fab-component.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('FabComponentComponent', () => {
  let component: FabComponentComponent;
  let fixture: ComponentFixture<FabComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FabComponentComponent ],
      imports: [ NoopAnimationsModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FabComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
