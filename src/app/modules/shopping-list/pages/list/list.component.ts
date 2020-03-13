import { Component, OnInit } from '@angular/core';
import { ShoppingListService } from '@app/modules/shopping-list/services/shopping-list.service';
import { ShoppingList } from '@app/modules/shopping-list/models/shopping-list.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  shoppingLists: Observable<ShoppingList[]>;

  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit() {
    this.shoppingLists = this.shoppingListService.getShoppingList();
  }

  selectShoppingList(id: number) {

  }

}
