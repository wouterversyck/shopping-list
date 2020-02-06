import {inject, TestBed} from '@angular/core/testing';

import { ShoppingListService } from './shopping-list.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ShoppingList } from '@app/modules/shopping-list/models/shopping-list.model';

describe('ShoppingListService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      ShoppingListService
    ],
    imports: [
      HttpClientTestingModule
    ]
  }));

  it('should be created', inject([ShoppingListService],
    (service: ShoppingListService) => {
    expect(service).toBeTruthy();
  }));

  it('should return a shopping list', inject([HttpTestingController, ShoppingListService],
    (httpMock: HttpTestingController, service: ShoppingListService) => {

      const data: ShoppingList[] = [{
        id: 'ID',
        name: 'NAME',
        items: [
          {
            id: 'ID',
            name: 'NAME_ITEM'
          }
        ]
      }];

      service.getShoppingList().subscribe((response: ShoppingList[]) => {
        expect(response).toEqual(data);
      });

      const req = httpMock.expectOne('api/shoppinglist/all');
      expect(req.request.method).toEqual('GET');
      // Then we set the fake data to be returned by the mock
      req.flush(data);
    }));
});
