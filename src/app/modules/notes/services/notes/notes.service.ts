import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Note } from '@app/modules/notes/models/note.model';
import { Observable } from 'rxjs';

@Injectable()
export class NotesService {
  private NOTES_URL = 'api/notes';

  constructor(private httpClient: HttpClient) { }

  getAll = () => this.httpClient.get<Note[]>(this.NOTES_URL);

  get = (id: string) => this.httpClient.get<Note>(`${this.NOTES_URL}/${id}`);

  save = (note: Note): Observable<Note> => this.httpClient.post<Note>(this.NOTES_URL, note);

  delete = (id: string) => this.httpClient.delete(`${this.NOTES_URL}/${id}`);
}
