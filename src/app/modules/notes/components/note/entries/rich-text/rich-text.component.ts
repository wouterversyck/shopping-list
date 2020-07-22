import { Component, ElementRef, EventEmitter, HostListener, Input, OnInit, Output, ViewChild } from '@angular/core';
import { NoteEntry } from '@app/modules/notes/components/note/note-entry.interface';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { RichText } from '@app/modules/notes/models/rich-text.model';

@Component({
  selector: 'app-rich-text',
  templateUrl: './rich-text.component.html',
  styleUrls: ['./rich-text.component.scss']
})
export class RichTextComponent implements OnInit, NoteEntry {
  @Input() entry: RichText;
  @Input() parentFormArray: FormArray;
  @Output() deleted = new EventEmitter<any>();
  @Output() movedUp = new EventEmitter<NoteEntry>();
  @Output() movedDown = new EventEmitter<NoteEntry>();

  editMode = false;
  formGroup: FormGroup;

  constructor(private eRef: ElementRef,
              private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group(this.entry);
    this.parentFormArray.push(this.formGroup);
  }

  deleteThis() {
    this.deleted.emit(this);
  }

  moveUp(event: MouseEvent) {
    event.stopPropagation();
    this.movedUp.emit();
  }

  moveDown(event: MouseEvent) {
    event.stopPropagation();
    this.movedDown.emit();
  }

  @HostListener('document:click', ['$event'])
  clickOut(event) {
    this.editMode = !!this.eRef.nativeElement.contains(event.target);
  }

  get contents() {
    return this.formGroup.controls.contents.value;
  }

}
