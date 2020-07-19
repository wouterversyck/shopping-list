import { Entry } from '@app/modules/notes/models/entry.model';

export class Note {
  id: string;
  name = 'title';
  items: Entry[] = [];
  contributors: number[] = [];
  owner: number;
}
