import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddListComponent } from './add-list.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ShoppingList } from '@app/modules/shopping-list/models/shopping-list.model';

describe('AddListComponent', () => {
  let component: AddListComponent;
  let fixture: ComponentFixture<AddListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddListComponent ],
      imports: [ReactiveFormsModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddListComponent);
    component = fixture.componentInstance;
    component.list = { name: 'title', items: [] } as ShoppingList;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
