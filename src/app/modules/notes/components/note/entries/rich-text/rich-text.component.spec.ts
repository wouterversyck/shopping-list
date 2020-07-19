import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RichTextComponent } from './rich-text.component';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '@app/modules/material/material.module';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { QuillModule } from 'ngx-quill';
import { Pipe, PipeTransform } from '@angular/core';
import { RichText } from '@app/modules/notes/models/rich-text.model';

describe('RichTextComponent', () => {
  let component: RichTextComponent;
  let fixture: ComponentFixture<RichTextComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RichTextComponent ],
      imports: [
        ReactiveFormsModule,
        MaterialModule,
        NoopAnimationsModule,
        QuillModule.forRoot()
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RichTextComponent);
    component = fixture.componentInstance;
    component.entry = new RichText();
    component.parentFormArray = new FormArray([]);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
