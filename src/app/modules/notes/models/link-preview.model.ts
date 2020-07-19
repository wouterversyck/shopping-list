import { EntryType } from '@app/modules/notes/models/entry-type.model';

export class LinkPreview {
  entryType = EntryType.LINK;
  title = '';
  description = '';
  image = '';
  url = '';
}
