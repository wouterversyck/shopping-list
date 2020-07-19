import { EntryType } from './entry-type.model';
import { CheckListItem } from './check-list-item.model';

export class CheckList {
  entryType = EntryType.CHECK_LIST;
  name = '';
  items: CheckListItem[] = [];
}
