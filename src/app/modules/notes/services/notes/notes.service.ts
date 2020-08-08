import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Note } from '@app/modules/notes/models/note.model';
import { Observable, Subject } from 'rxjs';
import { NgxIndexedDBService } from 'ngx-indexed-db';
import { AuthenticationService } from '@core/services/authentication/authentication.service';
import { NetworkStatusService } from '@core/services/network-status/network-status.service';
import { tap } from 'rxjs/operators';
import { fromPromise } from 'rxjs/internal-compatibility';

@Injectable()
export class NotesService {
  private NOTES_URL = 'api/shoppinglist';
  private STORE_NAME = 'notes';

  constructor(
    private httpClient: HttpClient,
    private indexedDBService: NgxIndexedDBService,
    private authService: AuthenticationService,
    private networkStatusService: NetworkStatusService) { }

  getAll = () => {
    if (this.isOnlineAndLoggedIn) {
      return this.httpClient.get<Note[]>(this.NOTES_URL)
        .pipe(
          tap(e => e.forEach(n => n.isLocal = false))
        );
    }
    return this.getAllOffline();
  }

  get = (id: string, local: boolean) => {
    if (local) {
      const key: number = +id;
      return fromPromise(this.indexedDBService.getByKey<Note>(this.STORE_NAME, key));
    }

    return this.httpClient.get<Note>(`${this.NOTES_URL}/${id}`);
  }

  save = (note: Note): Observable<Note> => {
    if (this.isOnlineAndLoggedIn) {
      return this.httpClient.post<Note>(this.NOTES_URL, note);
    }

    note.isLocal = true;
    return this.saveOffline(note);
  }

  delete = (id: string, local: boolean) => {
    if (local) {
      const key = +id;
      return fromPromise(this.indexedDBService.delete(this.STORE_NAME, key));
    }
    return this.httpClient.delete(`${this.NOTES_URL}/${id}`);
  }

  private saveOffline = (note: Note): Observable<Note> => {
    const retValue: Subject<Note> = new Subject();
    if (note.id) {
      this.indexedDBService.update(this.STORE_NAME, note).then(() => {
        retValue.next(note);
      });
    } else {
      this.indexedDBService.add(this.STORE_NAME, note).then((key: number) => {
        note.id = '' + key;
        retValue.next(note);
      });
    }

    return retValue.asObservable();
  }

  private getAllOffline = () => {
    return fromPromise(this.indexedDBService.getAll(this.STORE_NAME) as Promise<Note[]>);
  }

  private get isOnlineAndLoggedIn(): boolean {
    return this.authService.isLoggedIn() && this.networkStatusService.isOnline;
  }
}
