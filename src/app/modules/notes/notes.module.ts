import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NotesRoutingModule } from './notes-routing.module';
import { ListComponent } from './pages/list/list.component';
import { MaterialModule } from '@core/../material/material.module';
import { NotesService } from './services/notes/notes.service';
import { NoteComponent } from './components/note/note.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { CheckListComponent } from './components/note/entries/check-list/check-list.component';
import { RichTextComponent } from './components/note/entries/rich-text/rich-text.component';
import { QuillModule } from 'ngx-quill';
import { PreviewComponent } from './components/preview/preview.component';
import { EditNoteComponent } from './pages/edit-note/edit-note.component';
import { CreateNoteEntryComponent } from './components/dialogs/create-note-entry/create-note-entry.component';
import { LinkComponent } from './components/note/entries/link/link.component';
import { LinkPreviewService } from './services/link-preview/link-preview.service';

@NgModule({
  declarations: [
    ListComponent,
    NoteComponent,
    CheckListComponent,
    RichTextComponent,
    PreviewComponent,
    EditNoteComponent,
    CreateNoteEntryComponent,
    LinkComponent
  ],
  imports: [
    CommonModule,
    NotesRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    SharedModule,
    QuillModule
  ],
  providers: [NotesService, LinkPreviewService]
})
export class NotesModule { }
