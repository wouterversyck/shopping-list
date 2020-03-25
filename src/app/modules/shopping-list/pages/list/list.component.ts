import { Component, OnInit } from '@angular/core';
import { ShoppingListService } from '@app/modules/shopping-list/services/shopping-list.service';
import { ShoppingList } from '@app/modules/shopping-list/models/shopping-list.model';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  shoppingLists: ShoppingList[];

  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit() {
    this.shoppingListService.getShoppingList().subscribe(e => this.shoppingLists = e);
  }

  selectShoppingList(id: number) {

  }

  addList() {
    this.shoppingLists.push(new ShoppingList());
  }
}
