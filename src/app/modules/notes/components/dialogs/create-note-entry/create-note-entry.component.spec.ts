import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateNoteEntryComponent } from './create-note-entry.component';
import { MatDialogRef } from '@angular/material/dialog';

describe('CreateNoteEntryComponent', () => {
  let component: CreateNoteEntryComponent;
  let fixture: ComponentFixture<CreateNoteEntryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateNoteEntryComponent ],
      providers: [
        { provide: MatDialogRef, useValue: {} }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateNoteEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
