import { Component, OnInit } from '@angular/core';
import { NotesService } from '@app/modules/notes/services/notes/notes.service';
import { Note } from '@app/modules/notes/models/note.model';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  notes: Note[];

  constructor(private notesService: NotesService) { }

  ngOnInit() {
    this.getAllNotes();
  }

  deleteNote(id) {
    this.notesService.delete(id)
      .subscribe(this.getAllNotes);
  }

  getAllNotes = () => this.notesService.getAll().subscribe(e => this.notes = e);

  addNote() {
    this.notesService.save(new Note())
      .subscribe((e: Note) => {
        this.notes.push(e);
      });
  }
}
