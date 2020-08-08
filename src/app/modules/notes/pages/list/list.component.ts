import { Component, OnInit } from '@angular/core';
import { NotesService } from '@app/modules/notes/services/notes/notes.service';
import { Note } from '@app/modules/notes/models/note.model';
import { LoaderService } from '@core/services/loader/loader.service';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  notes: Note[];

  constructor(
    private notesService: NotesService,
    private loaderService: LoaderService) { }

  ngOnInit() {
    this.getAllNotes();
  }

  deleteNote(event: MouseEvent, id: string, isLocal: boolean) {
    event.stopPropagation();
    this.notesService.delete(id, isLocal)
      .subscribe(this.getAllNotes);
  }

  getAllNotes = () => {
    this.loaderService.show();
    this.notesService.getAll()
      .pipe(
        finalize(() => this.loaderService.hide())
      )
      .subscribe(e => this.notes = e);
  }

  addNote() {
    this.notesService.save(new Note())
      .subscribe((e: Note) => {
        this.notes.push(e);
      });
  }
}
