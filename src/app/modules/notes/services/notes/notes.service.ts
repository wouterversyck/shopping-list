import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Note } from '@app/modules/notes/models/note.model';
import { Observable } from 'rxjs';

@Injectable()
export class NotesService {
  private NOTES_URL = 'api/notes';

  constructor(private httpClient: HttpClient) { }

  getAll = () => {
    return this.httpClient.get<Note[]>(this.NOTES_URL);
  }

  get = (id: string) => {
    return this.httpClient.get<Note>(`${this.NOTES_URL}/${id}`);
  }

  save = (note: Note): Observable<Note> => {
    return this.httpClient.post<Note>(this.NOTES_URL, note);
  }

  delete = (id: string) => {
    return this.httpClient.delete(`${this.NOTES_URL}/${id}`);
  }
}
