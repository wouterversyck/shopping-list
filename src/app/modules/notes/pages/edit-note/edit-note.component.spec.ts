import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditNoteComponent } from './edit-note.component';
import { NotesService } from '@app/modules/notes/services/notes/notes.service';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { Note } from '@app/modules/notes/models/note.model';

describe('EditNoteComponent', () => {
  let component: EditNoteComponent;
  let fixture: ComponentFixture<EditNoteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditNoteComponent ],
      providers: [
        { provide: NotesService, useValue: { get: () => of(new Note()) } }
      ],
      imports: [
        RouterTestingModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditNoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
