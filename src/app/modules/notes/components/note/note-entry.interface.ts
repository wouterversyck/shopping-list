import { EventEmitter } from '@angular/core';
import { Entry } from '@app/modules/notes/models/entry.model';
import { FormGroup } from '@angular/forms';

export interface NoteEntry {
  entry: Entry;
  deleted: EventEmitter<any>;
  movedUp: EventEmitter<NoteEntry>;
  movedDown: EventEmitter<NoteEntry>;
  createForm(): FormGroup;
}
