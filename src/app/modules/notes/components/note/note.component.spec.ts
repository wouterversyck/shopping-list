import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NoteComponent } from './note.component';
import { Note } from '@app/modules/notes/models/note.model';
import { ReactiveFormsModule } from '@angular/forms';
import { NotesService } from '@app/modules/notes/services/notes.service';
import { of } from 'rxjs';

describe('NoteComponent', () => {
  let component: NoteComponent;
  let fixture: ComponentFixture<NoteComponent>;

  beforeEach(async(() => {
    const mockNotesService = {
      getNotes: () => of(),
      saveNote: (note: Note) => of()
    };
    TestBed.configureTestingModule({
      declarations: [ NoteComponent ],
      providers: [ { provide: NotesService, useValue: mockNotesService } ],
      imports: [ ReactiveFormsModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NoteComponent);
    component = fixture.componentInstance;
    component.note = { name: 'title', items: [] } as Note;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
