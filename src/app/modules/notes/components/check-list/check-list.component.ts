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
    if (!this.items.push) {
      this.entry.controls.children = this.formBuilder.array(
        [this.formBuilder.group(new Entry('SHOPPING_LIST_ITEM'))]
      );
    }
  }

  addItem() {
    this.items.push(this.createItem());
  }

  deleteItem(index: number) {
    this.items.removeAt(index);
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
