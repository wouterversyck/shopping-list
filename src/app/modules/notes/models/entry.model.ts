export class Entry {
  id: string;
  contents: string;
  entryType: string;
  checked = false;
  children: Entry[] = [];

  constructor(entryType?: string) {
    this.entryType =  entryType ?? 'RICH_TEXT';
  }
}
