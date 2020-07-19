import { Entry } from '@app/modules/notes/models/entry.model';
import { EntryType } from '@app/modules/notes/models/entry-type.model';

export class RichText implements Entry {
  entryType = EntryType.RICH_TEXT;
  name = '';
  contents = '';
}
