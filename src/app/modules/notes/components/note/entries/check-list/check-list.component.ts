import {
  AfterViewChecked,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  QueryList, SimpleChanges, ViewChild,
  ViewChildren
} from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { NoteEntry } from '@app/modules/notes/components/note/note-entry.interface';
import { EntryType } from '@app/modules/notes/models/entry-type.model';
import { CheckList } from '@app/modules/notes/models/check-list.model';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-check-list',
  templateUrl: './check-list.component.html',
  styleUrls: ['./check-list.component.scss']
})
export class CheckListComponent implements OnInit, AfterViewChecked, NoteEntry {
  @Input() entry: CheckList;
  @Output() deleted = new EventEmitter<any>();
  @Output() movedUp = new EventEmitter<NoteEntry>();
  @Output() movedDown = new EventEmitter<NoteEntry>();

  @ViewChildren('input') inputs: QueryList<ElementRef>;
  form: FormGroup;

  itemAdded = false;

  constructor(private formBuilder: FormBuilder) { }

  createForm(): FormGroup {
    return this.form = this.formBuilder.group({
      entryType: this.entry.entryType,
      name: this.entry.name,
      items: this.formBuilder.array(this.entry.items.map(e => this.formBuilder.group(e)))
    });
  }

  ngOnInit(): void {
  }

  addItem() {
    const item = this.createItem();
    this.formChecklistItems.push(item);
    this.itemAdded = true;
  }

  deleteThis() {
    this.deleted.emit(this);
  }

  deleteItem(index: number) {
    this.formChecklistItems.removeAt(index);
  }

  drop(event: CdkDragDrop<string[]>) {
    const formItem = this.formChecklistItems.at(event.previousIndex);
    this.formChecklistItems.removeAt(event.previousIndex);
    this.formChecklistItems.insert(event.currentIndex, formItem);
  }

  private createItem(): FormGroup {
    return this.formBuilder.group({
      checked: false,
      entryType: EntryType.CHECK_LIST_ITEM,
      name: '',
    });
  }

  get formChecklistItems(): FormArray {
    return this.form.controls.items as FormArray;
  }

  ngAfterViewChecked(): void {
    if (this.itemAdded) {
      this.itemAdded = false;
      this.inputs.last.nativeElement.focus();
    }
  }

}
