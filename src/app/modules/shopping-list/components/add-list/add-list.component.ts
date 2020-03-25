import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { ShoppingList } from '@app/modules/shopping-list/models/shopping-list.model';
import { ShoppingListItem } from '@app/modules/shopping-list/models/shopping-list-item.model';

@Component({
  selector: 'app-add-list',
  templateUrl: './add-list.component.html',
  styleUrls: ['./add-list.component.scss']
})
export class AddListComponent implements OnInit {
  @Input() list: ShoppingList;

  form: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: this.list.name,
      items: this.formBuilder.array(this.createItems(this.list.items))
    });

  }

  onSubmit() {

  }

  addItem(): void {
    const items = this.form.get('items') as FormArray;
    items.push(this.createItem());
  }

  private createItem(): FormGroup {
    return this.formBuilder.group({
      checked: false,
      name: '',
    });
  }

  private createItems(items: ShoppingListItem[]): FormGroup[] {
    if (Array.isArray(items) && items.length > 0) {
      return items.map(e => this.formBuilder.group(e));
    }

    return [this.formBuilder.group(new ShoppingListItem())];
  }

  get items(): FormGroup {
    return this.form.controls.items as FormGroup;
  }


  getCheckedItems(items: ShoppingListItem[]) {
    return items.filter(e => e.checked);
  }

  getUnCheckedItems(items: ShoppingListItem[]) {
    return items.filter(e => !e.checked);
  }
}
