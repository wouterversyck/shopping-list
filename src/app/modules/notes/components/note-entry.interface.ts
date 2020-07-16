import { FormGroup } from '@angular/forms';
import { EventEmitter } from '@angular/core';

export interface NoteEntry {
  entry: FormGroup;
  deleted: EventEmitter<void>;
}
