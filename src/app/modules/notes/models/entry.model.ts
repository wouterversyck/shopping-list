export class Entry {
  id: string;
  contents = 'Note';
  entryType = 'RICH_TEXT';
  checked = false;
  children: Entry[] = [];
}
