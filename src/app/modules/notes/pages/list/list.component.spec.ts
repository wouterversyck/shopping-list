import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListComponent } from './list.component';
import { MaterialModule } from '@app/modules/material/material.module';
import { CommonModule } from '@angular/common';
import { AppModule } from '@app/app.module';
import { NotesService } from '@app/modules/notes/services/notes/notes.service';

describe('ListComponent', () => {
  let component: ListComponent;
  let fixture: ComponentFixture<ListComponent>;

  afterEach(() => {
    fixture.destroy();
  });
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListComponent ],
      imports: [
        CommonModule,
        AppModule,
        MaterialModule
      ],
      providers: [
        NotesService
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
