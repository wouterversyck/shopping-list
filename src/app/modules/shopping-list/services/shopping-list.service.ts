import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ShoppingList } from '@app/modules/shopping-list/models/shopping-list.model';

@Injectable()
export class ShoppingListService {
  private SHOPPING_LIST_URL = 'api/shoppinglist';

  constructor(private httpClient: HttpClient) { }

  getShoppingList() {
    return this.httpClient.get<ShoppingList[]>(`${this.SHOPPING_LIST_URL}/all`);
  }
}
