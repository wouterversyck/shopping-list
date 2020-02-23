import { Component, OnInit } from '@angular/core';
import { User } from '@core/services/user/models/user.model';
import { UserService } from '@core/services/user/user.service';
import { UserPage } from '@core/services/user/models/UserPage.model';

@Component({
  selector: 'app-user-overview',
  templateUrl: './user-overview.component.html',
  styleUrls: ['./user-overview.component.scss']
})
export class UserOverviewComponent implements OnInit {
  pageNumber = 0;
  pageSize = 10;

  users: User[];

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getUsers(this.pageNumber, this.pageSize)
      .subscribe((users: UserPage) => this.users = users.content);
  }

  sendActivationMail(id: number) {
    this.userService.sendActivationMail(id).subscribe();
  }
}
