import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListComponent } from './list.component';
import { MaterialModule } from '@core/material/material.module';
import { CommonModule } from '@angular/common';
import { AppModule } from '@app/app.module';
import { ShoppingListService } from '@app/modules/shopping-list/services/shopping-list.service';

describe('ListComponent', () => {
  let component: ListComponent;
  let fixture: ComponentFixture<ListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListComponent ],
      imports: [
        CommonModule,
        AppModule,
        MaterialModule
      ],
      providers: [
        ShoppingListService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
