import { FormArray } from '@angular/forms';
import { EventEmitter } from '@angular/core';
import { Entry } from '@app/modules/notes/models/entry.model';

export interface NoteEntry {
  entry: Entry;
  deleted: EventEmitter<any>;
  movedUp: EventEmitter<NoteEntry>;
  movedDown: EventEmitter<NoteEntry>;
  parentFormArray: FormArray;
}
