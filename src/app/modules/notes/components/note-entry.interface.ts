import { FormArray, FormGroup } from '@angular/forms';
import { EventEmitter } from '@angular/core';
import { Entry } from '@app/modules/notes/models/entry.model';

export interface NoteEntry {
  entry: Entry;
  deleted: EventEmitter<any>;
  parentFormArray: FormArray;
}
