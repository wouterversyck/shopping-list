import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  title = 'shopping-list';

  constructor(http: HttpClient) {
    http.get("api/test").subscribe(e => console.log(e));
  }
}
