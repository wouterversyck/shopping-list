import { Component, OnInit } from '@angular/core';
import { NotesService } from '@app/modules/notes/services/notes.service';
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
    this.notesService.getNotes().subscribe(e => this.notes = e);
  }

  addNote() {
    this.notes.push(new Note());
  }
}
