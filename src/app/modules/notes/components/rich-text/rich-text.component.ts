import { Component, Input, OnInit } from '@angular/core';
import { Entry } from '@app/modules/notes/models/entry.model';
import { NoteEntry } from '@app/modules/notes/components/note-entry.interface';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-rich-text',
  templateUrl: './rich-text.component.html',
  styleUrls: ['./rich-text.component.scss']
})
export class RichTextComponent implements OnInit, NoteEntry {
  @Input() entry: Entry;
  form: FormGroup;
  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      contents: this.entry.contents
    });
  }

  onSubmit() {

  }

}
