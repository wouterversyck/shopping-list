import {
  Component,
  ComponentFactoryResolver,
  ComponentRef,
  Input, OnDestroy,
  OnInit,
  ViewChild, ViewRef
} from '@angular/core';
import { Note } from '@app/modules/notes/models/note.model';
import { AddHostDirective } from '@shared/directives/add-host/add-host.directive';
import { NoteEntry } from '@app/modules/notes/components/note/note-entry.interface';
import { RichTextComponent } from '@app/modules/notes/components/note/entries/rich-text/rich-text.component';
import { CheckListComponent } from '@app/modules/notes/components/note/entries/check-list/check-list.component';
import { AbstractControl, FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { NotesService } from '@app/modules/notes/services/notes/notes.service';
import { debounceTime, map, switchMap } from 'rxjs/operators';
import { EntryType } from '@app/modules/notes/models/entry-type.model';
import { LinkComponent } from '@app/modules/notes/components/note/entries/link/link.component';
import { RichText } from '@app/modules/notes/models/rich-text.model';
import { CheckList } from '@app/modules/notes/models/check-list.model';
import { LinkPreview } from '@app/modules/notes/models/link-preview.model';
import { Entry } from '@app/modules/notes/models/entry.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.scss']
})
export class NoteComponent implements OnInit, OnDestroy {
  @Input() note: Note;
  form: FormGroup;
  @ViewChild('list', {static: true}) listHtml: HTMLElement;
  @ViewChild(AddHostDirective, {static: true}) adHost: AddHostDirective;

  subs: Subscription[] = [];

  entryMap = new Map<EntryType, any>([
    [EntryType.CHECK_LIST, { component: CheckListComponent, entry: CheckList }],
    [EntryType.RICH_TEXT, { component: RichTextComponent, entry: RichText }],
    [EntryType.LINK, { component: LinkComponent, entry: LinkPreview }]
  ]);

  fabButtons = [
    {
      icon: 'text_format',
      action: () => this.addItemToViewAndSyncServer(EntryType.RICH_TEXT)
    },
    {
      icon: 'check',
      action: () => this.addItemToViewAndSyncServer(EntryType.CHECK_LIST)
    },
    {
      icon: 'link',
      action: () => this.addItemToViewAndSyncServer(EntryType.LINK)
    }
  ];

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private formBuilder: FormBuilder,
    private notesService: NotesService) { }

  ngOnDestroy(): void {
      this.subs.forEach(sub => sub.unsubscribe());
  }

  ngOnInit() {
    const forms = this.constructDynamicComponents();
    this.constructForm(this.formBuilder.array(forms));
    this.wireFormToService();
  }

  addItemToViewAndSyncServer(type: EntryType) {
      const entry = new (this.entryMap.get(type).entry)();
      this.formItems.push(this.addEntry(entry));
  }

  private constructForm(forms: FormArray) {
    this.form = this.formBuilder.group({
      name: this.note.name,
      id: this.note.id,
      owner: this.note.owner,
      contributors: this.formBuilder.array(this.createContributors(this.note.contributors)),
      items: forms
    });
  }

  private createContributors(contributors: number[]): FormGroup[] {
    if (Array.isArray(contributors) && contributors.length > 0) {
      return contributors.map(e => this.formBuilder.group({ id: e }));
    }

    return [];
  }

  private wireFormToService() {
    this.subs.push(this.form.valueChanges
      .pipe(
        debounceTime(500),
        map(e => {
          e.contributors = e.contributors.map(d => d.id);
          return e;
        }),
        switchMap(this.notesService.save)
      ).subscribe());
  }

  private constructDynamicComponents() {
    if (!this.note.items) {
      return;
    }

    return this.note.items
      .map(e => this.addEntry(e));
  }

  private addEntry(entry: Entry) {
    const componentRef = this.getComponentFromEntry(entry.entryType);
    const component = componentRef.instance as NoteEntry;

    component.entry = entry;
    this.subs.push(component.deleted.subscribe(_ => this.delete(componentRef.hostView)));
    this.subs.push(component.movedDown.subscribe(_ => this.moveComponentDown(componentRef.hostView)));
    this.subs.push(component.movedUp.subscribe(_ => this.moveComponentUp(componentRef.hostView)));

    return component.createForm();
  }

  private getComponentFromEntry(entryType: EntryType): ComponentRef<unknown> {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(
      this.entryMap.get(entryType).component
    );
    return this.adHost.viewContainerRef.createComponent(componentFactory);
  }

  private moveComponentDown(hostView: ViewRef) {
    const previousIndex = this.adHost.viewContainerRef.indexOf(hostView);
    const newIndex = previousIndex < this.adHost.viewContainerRef.length - 1 ? previousIndex + 1 : previousIndex;

    this.moveFormItemAndComponent(previousIndex, newIndex, this.formItems.at(previousIndex), hostView);
  }

  private moveComponentUp(hostView: ViewRef) {
    const previousIndex = this.adHost.viewContainerRef.indexOf(hostView);
    const newIndex = previousIndex > 0 ? previousIndex - 1 : previousIndex;

    this.moveFormItemAndComponent(previousIndex, newIndex, this.formItems.at(previousIndex), hostView);
  }

  private moveFormItemAndComponent(previousIndex: number, newIndex: number, formItem: AbstractControl, viewRef: ViewRef) {
    if (previousIndex === newIndex) {
      return;
    }

    this.adHost.viewContainerRef.move(viewRef, newIndex);
    this.formItems.removeAt(previousIndex);
    this.formItems.insert(newIndex, formItem);
  }

  private delete(hostView: ViewRef) {
    const index = this.adHost.viewContainerRef.indexOf(hostView);
    this.adHost.viewContainerRef.remove(index);
    this.formItems.removeAt(index);
  }

  get formItems(): FormArray {
    return (this.form.controls.items as FormArray);
  }

}
