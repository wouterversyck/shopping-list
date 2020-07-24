import { Component, OnInit } from '@angular/core';
import { Note } from '@app/modules/notes/models/note.model';
import { NotesService } from '@app/modules/notes/services/notes/notes.service';
import { ActivatedRoute } from '@angular/router';
import { LoaderService } from '@core/services/loader/loader.service';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-edit-note',
  templateUrl: './edit-note.component.html',
  styleUrls: ['./edit-note.component.scss']
})
export class EditNoteComponent implements OnInit {
  note: Note;
  constructor(
    private notesService: NotesService,
    private route: ActivatedRoute,
    private loaderService: LoaderService) { }

  ngOnInit(): void {
    this.loaderService.show();
    const id = this.route.snapshot.paramMap.get('id');
    this.notesService.get(id)
      .pipe(
        finalize(() => this.loaderService.hide())
      )
      .subscribe(e => this.note = e);
  }

}
