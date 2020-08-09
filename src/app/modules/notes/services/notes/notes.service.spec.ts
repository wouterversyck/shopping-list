import { inject, TestBed } from '@angular/core/testing';

import { NotesService } from './notes.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Note } from '@app/modules/notes/models/note.model';
import { RichText } from '@app/modules/notes/models/rich-text.model';
import { NgxIndexedDBService } from 'ngx-indexed-db';
import { NetworkStatusService } from '@core/services/network-status/network-status.service';
import { AuthenticationService } from '@core/services/authentication/authentication.service';

describe('NotesService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      NotesService,
      { provide: NgxIndexedDBService, useValue: { } },
      { provide: AuthenticationService, useValue: { isLoggedIn: () => true } },
      { provide: NetworkStatusService, useValue: { isOnline: true} }
    ],
    imports: [
      HttpClientTestingModule
    ]
  }));

  it('should be created', inject([NotesService],
    (service: NotesService) => {
    expect(service).toBeTruthy();
  }));

  it('should return a note list', inject([HttpTestingController, NotesService],
    (httpMock: HttpTestingController, service: NotesService) => {

      const data: Note[] = [{
        id: 'ID',
        name: 'NAME',
        contributors: [1],
        owner: 1,
        isLocal: false,
        items: [new RichText()]
      }];

      service.getAll().subscribe((response: Note[]) => {
        expect(response).toEqual(data);
      });

      const req = httpMock.expectOne('api/notes');
      expect(req.request.method).toEqual('GET');
      // Then we set the fake data to be returned by the mock
      req.flush(data);

      httpMock.verify();
    }));
});
