import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { LinkPreviewService } from '@app/modules/notes/services/link-preview/link-preview.service';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { NoteEntry } from '@app/modules/notes/components/note-entry.interface';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { LinkPreview } from '@app/modules/notes/models/link-preview.model';

@Component({
  selector: 'app-link',
  templateUrl: './link.component.html',
  styleUrls: ['./link.component.scss']
})
export class LinkComponent implements OnInit, NoteEntry {
  @Input() entry: LinkPreview;
  @Input() parentFormArray: FormArray;
  @Output() deleted = new EventEmitter<any>();

  linkPreview: Observable<LinkPreview>;
  formGroup: FormGroup;

  constructor(
    private linkPreviewService: LinkPreviewService,
    private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group(this.entry);
    this.parentFormArray.push(this.formGroup);

    this.linkPreview = this.formGroup.controls.url.valueChanges
     .pipe(
       debounceTime(1500),
       distinctUntilChanged(),
       switchMap(e => this.linkPreviewService.getLinkPreview(e)));
  }

  deleteThis() {
    this.deleted.emit(this);
  }

}
