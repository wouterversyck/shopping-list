import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { EntryType } from '@app/modules/notes/models/entry-type.model';

@Component({
  selector: 'app-create-note-entry',
  templateUrl: './create-note-entry.component.html',
  styleUrls: ['./create-note-entry.component.scss']
})
export class CreateNoteEntryComponent implements OnInit {
  entryType = EntryType;

  constructor(private dialogRef: MatDialogRef<CreateNoteEntryComponent>) { }

  ngOnInit(): void {
  }

  select(type: string) {
    this.dialogRef.close(type);
  }

}
