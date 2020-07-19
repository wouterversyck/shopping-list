import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { NoteEntry } from '@app/modules/notes/components/note-entry.interface';
import { EntryType } from '@app/modules/notes/models/entry-type.model';
import { CheckList } from '@app/modules/notes/models/check-list.model';
import { CheckListItem } from '@app/modules/notes/models/check-list-item.model';

@Component({
  selector: 'app-check-list',
  templateUrl: './check-list.component.html',
  styleUrls: ['./check-list.component.scss']
})
export class CheckListComponent implements OnInit, NoteEntry {
  @Input() entry: CheckList;
  @Input() parentFormArray: FormArray;
  @Output() deleted = new EventEmitter<any>();

  formGroup: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      entryType: this.entry.entryType,
      name: this.entry.name,
      items: this.formBuilder.array(this.entry.items.map(e => this.formBuilder.group(e)))
    });
    this.parentFormArray.push(this.formGroup);
  }

  addItem() {
    this.formChecklistItems.push(this.createItem());
  }

  deleteThis() {
    this.deleted.emit(this);
  }

  deleteItem(index: number) {
    this.formChecklistItems.removeAt(index);
  }

  private createItem(): FormGroup {
    return this.formBuilder.group({
      checked: false,
      entryType: EntryType.CHECK_LIST_ITEM,
      name: '',
    });
  }

  get formChecklistItems(): FormArray {
    return this.formGroup.controls.items as FormArray;
  }

  getCheckedItems(items: CheckListItem[]) {
    return items.filter(e => e.checked);
  }

  getUnCheckedItems(items: CheckListItem[]) {
    return items.filter(e => !e.checked);
  }
}
