import { Component, OnInit } from '@angular/core';
import { UserService } from '@core/services/user/user.service';
import { User } from '@core/services/user/models/user.model';
import { UserPage } from '@core/services/user/models/UserPage.model';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  pageNumber = 0;
  pageSize = 10;

  users: User[];

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getUsers(this.pageNumber, this.pageSize)
      .subscribe((users: UserPage) => this.users = users.content);
  }

}
