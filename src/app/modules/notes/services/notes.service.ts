import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Note } from '@app/modules/notes/models/note.model';

@Injectable()
export class NotesService {
  private NOTES_URL = 'api/shoppinglist';

  constructor(private httpClient: HttpClient) { }

  getNotes() {
    return this.httpClient.get<Note[]>(`${this.NOTES_URL}/all`);
  }

  saveNote(note: Note) {
    return this.httpClient.post(`${this.NOTES_URL}/save`, note);
  }
}
