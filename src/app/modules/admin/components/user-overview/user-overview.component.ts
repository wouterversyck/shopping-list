import { Component, OnInit } from '@angular/core';
import { User } from '@core/services/user/models/user.model';
import { UserService } from '@core/services/user/user.service';
import { UserPage } from '@core/services/user/models/UserPage.model';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-user-overview',
  templateUrl: './user-overview.component.html',
  styleUrls: ['./user-overview.component.scss']
})
export class UserOverviewComponent implements OnInit {
  users: UserPage = new UserPage();
  displayedColumns: string[] = ['username', 'email', 'role', 'sendPasswordMail', 'edit'];

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getUsers()
      .subscribe((users: UserPage) => this.users = users);
  }

  getServerData(pageEvent: PageEvent) {
    this.userService.getUsers(pageEvent.pageIndex, pageEvent.pageSize)
      .subscribe((users: UserPage) => this.users = users)
  }

  sendActivationMail(id: number) {
    this.userService.sendActivationMail(id).subscribe();
  }
}
