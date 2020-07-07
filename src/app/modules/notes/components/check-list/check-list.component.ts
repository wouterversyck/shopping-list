import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { Entry } from '@app/modules/notes/models/entry.model';
import { NoteEntry } from '@app/modules/notes/components/note-entry.interface';

@Component({
  selector: 'app-check-list',
  templateUrl: './check-list.component.html',
  styleUrls: ['./check-list.component.scss']
})
export class CheckListComponent implements OnInit, NoteEntry {
  @Input() entry: Entry;
  form: FormGroup;
  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      title: this.entry.contents,
      items: this.formBuilder.array(this.createItems(this.entry.children))
    });
  }

  onSubmit() {

  }

  addItem() {
    const items = this.form.get('items') as FormArray;
    items.push(this.createItem());
  }

  private createItem(): FormGroup {
    return this.formBuilder.group({
      checked: false,
      contents: '',
    });
  }

  private createItems(items: Entry[]): FormGroup[] {
    if (Array.isArray(items) && items.length > 0) {
      return items.map(e => this.formBuilder.group(e));
    }

    return [this.formBuilder.group(new Entry())];
  }

  get items(): FormGroup {
    return this.form.controls.items as FormGroup;
  }

  getCheckedItems(items: Entry[]) {
    return items.filter(e => e.checked);
  }

  getUnCheckedItems(items: Entry[]) {
    return items.filter(e => !e.checked);
  }
}
