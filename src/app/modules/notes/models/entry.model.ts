import { EntryType } from '@app/modules/notes/models/entry-type.model';

export class Entry {
  contents = '';
  entryType: EntryType;
  checked = false;
  children: Entry[] = [];

  constructor(entryType?: EntryType) {
    this.entryType =  entryType ?? EntryType.RICH_TEXT;
  }
}
