import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Note } from '@app/modules/notes/models/note.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.scss']
})
export class PreviewComponent implements OnInit {
  @Output() deleted = new EventEmitter<string>();
  @Input() note: Note;
  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  delete() {
    this.deleted.emit(this.note.id);
  }

  open() {
    this.router.navigate([`list/${this.note.id}`]);
  }
}
