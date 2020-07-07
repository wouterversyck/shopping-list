import { Component, ComponentFactoryResolver, Input, OnInit, ViewChild } from '@angular/core';
import { Note } from '@app/modules/notes/models/note.model';
import { AddHostDirective } from '@shared/directives/add-host.directive';
import { Entry } from '@app/modules/notes/models/entry.model';
import { NoteEntry } from '@app/modules/notes/components/note-entry.interface';
import { RichTextComponent } from '@app/modules/notes/components/rich-text/rich-text.component';
import { CheckListComponent } from '@app/modules/notes/components/check-list/check-list.component';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.scss']
})
export class NoteComponent implements OnInit {
  @Input() note: Note;
  @ViewChild(AddHostDirective, {static: true}) adHost: AddHostDirective;

  components = {
    RICH_TEXT: RichTextComponent,
    SHOPPING_LIST: CheckListComponent
  };

  constructor(private componentFactoryResolver: ComponentFactoryResolver) { }

  ngOnInit() {
    if (!this.note.items) {
      return;
    }

    this.note.items.forEach((e: Entry) => this.addEntry(e));
  }

  addEntry(entry: Entry) {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(this.components[entry.entryType]);
    const componentRef = this.adHost.viewContainerRef.createComponent(componentFactory);
    (componentRef.instance as NoteEntry).entry = entry;
  }

  addItem() {
    this.addEntry(new Entry());
  }

}
