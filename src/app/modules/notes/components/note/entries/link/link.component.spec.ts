import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LinkComponent } from './link.component';
import { LinkPreviewService } from '@app/modules/notes/services/link-preview/link-preview.service';
import { FormArray, ReactiveFormsModule } from '@angular/forms';
import { CheckList } from '@app/modules/notes/models/check-list.model';
import { LinkPreview } from '@app/modules/notes/models/link-preview.model';

describe('LinkComponent', () => {
  let component: LinkComponent;
  let fixture: ComponentFixture<LinkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LinkComponent ],
      providers: [
        { provide: LinkPreviewService, useValue: {}}
      ],
      imports: [
        ReactiveFormsModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LinkComponent);
    component = fixture.componentInstance;
    component.entry = new LinkPreview();
    component.parentFormArray = new FormArray([]);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
