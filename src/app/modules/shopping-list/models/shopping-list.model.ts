import { ShoppingListItem } from '@app/modules/shopping-list/models/shopping-list-item.model';

export class ShoppingList {
  id: number;
  name: string;
  items: ShoppingListItem[]
}
