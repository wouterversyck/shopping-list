import { EntryType } from '@app/modules/notes/models/entry-type.model';

export class CheckListItem {
  entryType = EntryType.CHECK_LIST_ITEM;
  name = '';
  checked = false;
}
