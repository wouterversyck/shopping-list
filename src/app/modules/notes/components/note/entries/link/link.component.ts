import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { LinkPreviewService } from '@app/modules/notes/services/link-preview/link-preview.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NoteEntry } from '@app/modules/notes/components/note/note-entry.interface';
import { debounceTime, distinctUntilChanged, filter, map, startWith, switchMap, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { LinkPreview } from '@app/modules/notes/models/link-preview.model';
import { LoaderService } from '@core/services/loader/loader.service';

@Component({
  selector: 'app-link',
  templateUrl: './link.component.html',
  styleUrls: ['./link.component.scss']
})
export class LinkComponent implements OnInit, NoteEntry {
  @Input() entry: LinkPreview;
  @Output() deleted = new EventEmitter<any>();
  @Output() movedUp = new EventEmitter<NoteEntry>();
  @Output() movedDown = new EventEmitter<NoteEntry>();

  urlRegex = 'https?:\\/\\/(www\\.)?[-a-zA-Z0-9@:%._\\+~#=]{1,256}\\.[a-zA-Z0-9()]{1,6}\\b([-a-zA-Z0-9()@:%_\\+.~#?&//=]*)';

  linkPreview: Observable<LinkPreview>;
  form: FormGroup;

  constructor(
    private linkPreviewService: LinkPreviewService,
    private formBuilder: FormBuilder,
    private loaderService: LoaderService) { }

  createForm(): FormGroup {
    return this.form = this.formBuilder.group(this.entry);
  }

  ngOnInit(): void {

    this.linkPreview = this.form.controls.url.valueChanges
     .pipe(
       debounceTime(1500),
       distinctUntilChanged(),
       map(e => e.match('^https?://') ? e : `https://${e}`),
       filter(value => value.match(this.urlRegex)),
       tap(() => this.loaderService.show()),
       switchMap(e => this.linkPreviewService.getLinkPreview(e)),
       tap((val) => this.form.patchValue(val)),
       tap(() => this.loaderService.hide())
     )
      .pipe(
        startWith(this.entry.image ? this.entry : null)
      );
  }

  deleteThis() {
    this.deleted.emit(this);
  }
}
