import { EntryType } from '@app/modules/notes/models/entry-type.model';
import { Entry } from '@app/modules/notes/models/entry.model';

export class LinkPreview implements Entry {
  entryType = EntryType.LINK;
  title = '';
  description = '';
  image = '';
  url = '';
}
