import { EntryType } from './entry-type.model';
import { CheckListItem } from './check-list-item.model';
import { Entry } from '@app/modules/notes/models/entry.model';

export class CheckList implements Entry {
  entryType = EntryType.CHECK_LIST;
  name = '';
  items: CheckListItem[] = [];
}
