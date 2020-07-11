import { Component, Input, OnInit } from '@angular/core';
import { NoteEntry } from '@app/modules/notes/components/note-entry.interface';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-rich-text',
  templateUrl: './rich-text.component.html',
  styleUrls: ['./rich-text.component.scss']
})
export class RichTextComponent implements OnInit, NoteEntry {
  @Input() entry: FormGroup;
  editMode = false;

  constructor() { }

  ngOnInit(): void {
  }

  onSubmit() {
    this.toggleEditMode();
  }

  get contents() {
    return this.entry.controls.contents.value;
  }

  toggleEditMode() {
    this.editMode = !this.editMode;
  }

}
