import { Component, ComponentFactoryResolver, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Note } from '@app/modules/notes/models/note.model';
import { AddHostDirective } from '@shared/directives/add-host/add-host.directive';
import { Entry } from '@app/modules/notes/models/entry.model';
import { NoteEntry } from '@app/modules/notes/components/note-entry.interface';
import { RichTextComponent } from '@app/modules/notes/components/note/entries/rich-text/rich-text.component';
import { CheckListComponent } from '@app/modules/notes/components/note/entries/check-list/check-list.component';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { NotesService } from '@app/modules/notes/services/notes.service';
import { debounceTime, map, switchMap } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { CreateNoteEntryComponent } from '@app/modules/notes/components/dialogs/create-note-entry/create-note-entry.component';
import { EntryType } from '@app/modules/notes/models/entry-type.model';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.scss']
})
export class NoteComponent implements OnInit {
  @Input() note: Note;
  form: FormGroup;
  @ViewChild(AddHostDirective, {static: true}) adHost: AddHostDirective;

  componentMap = new Map<EntryType, any>([
    [EntryType.CHECK_LIST, CheckListComponent],
    [EntryType.RICH_TEXT, RichTextComponent]
  ]);

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private formBuilder: FormBuilder,
    private notesService: NotesService,
    private dialog: MatDialog) { }

  ngOnInit() {
    this.constructForm();
    this.wireFormToService();
    this.constructDynamicComponents();
  }

  addItemToViewAndSyncServer() {
    this.dialog
      .open(CreateNoteEntryComponent)
      .afterClosed().subscribe((result: EntryType) => {
      const item = this.createFormGroupFromEntryType(result);
      this.items.push(item);
      this.addEntry(item);
    });
  }

  private constructForm() {
    this.form = this.formBuilder.group({
      name: this.note.name,
      id: this.note.id,
      owner: this.note.owner,
      items: this.formBuilder.array(this.createItems(this.note.items)),
      contributors: this.formBuilder.array(this.createContributors(this.note.contributors))
    });
  }

  private createItems(items: Entry[]): FormGroup[] {
    if (!Array.isArray(items) || items.length === 0) {
      return [];
    }

    return items.map(e => this.formBuilder.group({
      contents: e.contents,
      entryType: e.entryType,
      checked: e.checked,
      children: this.formBuilder.array(this.createItems(e.children))
    }));
  }

  private createContributors(contributors: number[]): FormGroup[] {
    if (Array.isArray(contributors) && contributors.length > 0) {
      return contributors.map(e => this.formBuilder.group({ id: e }));
    }

    return [];
  }

  private wireFormToService() {
    this.form.valueChanges
      .pipe(
        debounceTime(500),
        map(e => {
          e.contributors = e.contributors.map(d => d.id);
          return e;
        }),
        switchMap(this.notesService.save)
      ).subscribe();
  }

  private createFormGroupFromEntryType(entryType: EntryType) {
    const entry = new Entry(entryType);
    entry.contents = 'title';
    return this.formBuilder.group(entry);
  }

  private constructDynamicComponents() {
    (this.form.controls.items as FormArray).controls
      .forEach((e: FormGroup) => this.addEntry(e));
  }

  private addEntry(entry: FormGroup) {
    const component = this.getComponentFromEntryType(entry.value.entryType);
    const index = this.items.controls.indexOf(entry);
    component.entry = entry;
    component.deleted.subscribe(e => this.delete(index));
  }

  private getComponentFromEntryType(entryType: EntryType): NoteEntry {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(
      this.componentMap.get(entryType)
    );
    const componentRef = this.adHost.viewContainerRef.createComponent(componentFactory);
    return componentRef.instance as NoteEntry;
  }

  private delete(index: number) {
    this.items.removeAt(index);
    this.adHost.viewContainerRef.clear();

    if (this.note.items) {
      this.constructDynamicComponents();
    }
  }

  get items(): FormArray {
    return (this.form.controls.items as FormArray);
  }

}
