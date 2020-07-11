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
  @Input() entry: FormGroup;
  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
  }

  addItem() {
    this.items.push(this.createItem());
  }

  private createItem(): FormGroup {
    return this.formBuilder.group({
      checked: false,
      contents: '',
    });
  }

  get items(): FormArray {
    return this.entry.controls.children as FormArray;
  }

  getCheckedItems(items: Entry[]) {
    return items.filter(e => e.checked);
  }

  getUnCheckedItems(items: Entry[]) {
    return items.filter(e => !e.checked);
  }
}
