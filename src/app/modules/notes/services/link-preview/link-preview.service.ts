import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LinkPreview } from '@app/modules/notes/models/link-preview.model';

@Injectable()
export class LinkPreviewService {
  private PREVIEW_URL = 'api/linkpreview?q=';

  constructor(private httpClient: HttpClient) { }

  getLinkPreview(link: string): Observable<LinkPreview> {
    return this.httpClient.get<LinkPreview>(this.PREVIEW_URL + link);
  }
}
