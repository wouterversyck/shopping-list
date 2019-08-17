import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShoppingListRoutingModule } from './shopping-list-routing.module';
import { ListComponent } from './list/list.component';
import { MaterialModule } from '@core/material/material.module';
import { ShoppingListService } from '@app/modules/shopping-list/services/shopping-list.service';

@NgModule({
  declarations: [ListComponent],
  imports: [
    CommonModule,
    ShoppingListRoutingModule,
    MaterialModule
  ],
  providers: [ShoppingListService]
})
export class ShoppingListModule { }
