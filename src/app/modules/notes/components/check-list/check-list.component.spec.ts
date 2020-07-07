import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckListComponent } from './check-list.component';
import { Entry } from '@app/modules/notes/models/entry.model';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '@app/modules/material/material.module';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('CheckListComponent', () => {
  let component: CheckListComponent;
  let fixture: ComponentFixture<CheckListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CheckListComponent ],
      imports: [
        ReactiveFormsModule,
        MaterialModule,
        NoopAnimationsModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckListComponent);
    component = fixture.componentInstance;
    component.entry = {
      contents: 'test',
      entryType: 'RICH_TEXT',
      checked: false,
      children: []
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
