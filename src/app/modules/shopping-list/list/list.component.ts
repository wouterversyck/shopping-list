import { Component, OnInit } from '@angular/core';
import { ShoppingListService } from '@app/modules/shopping-list/services/shopping-list.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.sass']
})
export class ListComponent implements OnInit {


  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit() {
    this.shoppingListService.getShoppingList().subscribe(e => console.log(e));
  }

}
