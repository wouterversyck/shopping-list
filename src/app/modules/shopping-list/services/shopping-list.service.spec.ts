import { TestBed } from '@angular/core/testing';

import { ShoppingListService } from './shopping-list.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('ShoppingListService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      ShoppingListService
    ],
    imports: [
      HttpClientTestingModule
    ]
  }));

  it('should be created', () => {
    const service: ShoppingListService = TestBed.get(ShoppingListService);
    expect(service).toBeTruthy();
  });
});
