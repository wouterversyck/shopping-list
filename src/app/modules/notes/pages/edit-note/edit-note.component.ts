import { Component, OnInit } from '@angular/core';
import { Note } from '@app/modules/notes/models/note.model';
import { NotesService } from '@app/modules/notes/services/notes.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-note',
  templateUrl: './edit-note.component.html',
  styleUrls: ['./edit-note.component.scss']
})
export class EditNoteComponent implements OnInit {
  note: Note;
  constructor(private notesService: NotesService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.notesService.get(id).subscribe(e => this.note = e);
  }

  deleteNote(event) {

  }

  addEntry() {

  }

}
