import { inject, TestBed } from '@angular/core/testing';

import { NotesService } from './notes.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Note } from '@app/modules/notes/models/note.model';
import { RichText } from '@app/modules/notes/models/rich-text.model';

describe('NotesService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      NotesService
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
