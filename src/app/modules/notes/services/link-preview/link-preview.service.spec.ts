import { LinkPreviewService } from './link-preview.service';
import { HttpClient } from '@angular/common/http';

describe('LinkPreviewService', () => {
  let service: LinkPreviewService;

  beforeEach(() => {
    service = new LinkPreviewService({} as HttpClient);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
