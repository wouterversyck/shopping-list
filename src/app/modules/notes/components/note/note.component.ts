import { Component, ComponentFactoryResolver, Input, OnInit, ViewChild } from '@angular/core';
import { Note } from '@app/modules/notes/models/note.model';
import { AddHostDirective } from '@shared/directives/add-host/add-host.directive';
import { Entry } from '@app/modules/notes/models/entry.model';
import { NoteEntry } from '@app/modules/notes/components/note-entry.interface';
import { RichTextComponent } from '@app/modules/notes/components/note/entries/rich-text/rich-text.component';
import { CheckListComponent } from '@app/modules/notes/components/note/entries/check-list/check-list.component';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { NotesService } from '@app/modules/notes/services/notes/notes.service';
import { debounceTime, map, switchMap } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { CreateNoteEntryComponent } from '@app/modules/notes/components/dialogs/create-note-entry/create-note-entry.component';
import { EntryType } from '@app/modules/notes/models/entry-type.model';
import { LinkComponent } from '@app/modules/notes/components/note/entries/link/link.component';
import { RichText } from '@app/modules/notes/models/rich-text.model';
import { CheckList } from '@app/modules/notes/models/check-list.model';
import { LinkPreview } from '@app/modules/notes/models/link-preview.model';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.scss']
})
export class NoteComponent implements OnInit {
  @Input() note: Note;
  form: FormGroup;
  @ViewChild(AddHostDirective, {static: true}) adHost: AddHostDirective;

  entryMap = new Map<EntryType, any>([
    [EntryType.CHECK_LIST, { component: CheckListComponent, entry: CheckList }],
    [EntryType.RICH_TEXT, { component: RichTextComponent, entry: RichText }],
    [EntryType.LINK, { component: LinkComponent, entry: LinkPreview }]
  ]);

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private formBuilder: FormBuilder,
    private notesService: NotesService,
    private dialog: MatDialog) { }

  ngOnInit() {
    this.constructForm();
    this.constructDynamicComponents();
    this.wireFormToService();
  }

  addItemToViewAndSyncServer() {
    this.dialog
      .open(CreateNoteEntryComponent)
      .afterClosed().subscribe((result: EntryType) => {
        const entry = new (this.entryMap.get(result).entry)();
        this.note.items.push(entry);
        this.addEntry(entry);
    });
  }

  private constructForm() {
    this.form = this.formBuilder.group({
      name: this.note.name,
      id: this.note.id,
      owner: this.note.owner,
      contributors: this.formBuilder.array(this.createContributors(this.note.contributors)),
      items: this.formBuilder.array([])
    });
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

  private constructDynamicComponents() {
    if(!this.items) {
      return;
    }

    return this.note.items
      .map(e => this.addEntry(e));
  }

  private addEntry(entry: Entry) {
    const component = this.getComponentFromEntryType(entry.entryType);
    component.entry = entry;
    component.parentFormArray = this.items;
    component.deleted.subscribe(e => this.delete(e));
    return component;
  }

  private getComponentFromEntryType(entryType: EntryType): NoteEntry {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(
      this.entryMap.get(entryType).component
    );
    const componentRef = this.adHost.viewContainerRef.createComponent(componentFactory);
    return componentRef.instance as NoteEntry;
  }

  private delete(component: any) {
    this.items.clear();

    const index = this.items.controls.indexOf(component);
    this.note.items.splice(index, 1);

    this.adHost.viewContainerRef.clear();
    this.constructDynamicComponents();
  }

  get items(): FormArray {
    return (this.form.controls.items as FormArray);
  }

}
