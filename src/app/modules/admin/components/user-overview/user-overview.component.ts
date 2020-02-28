import { Component, OnInit } from '@angular/core';
import { UserService } from '@core/services/user/user.service';
import { UserPage } from '@core/services/user/models/UserPage.model';
import { PageEvent } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { UserFormComponent } from '@app/modules/admin/components/dialogs/user-form/user-form.component';
import { SnackBarService } from '@core/services/snack-bar/snack-bar.service';

@Component({
  selector: 'app-user-overview',
  templateUrl: './user-overview.component.html',
  styleUrls: ['./user-overview.component.scss']
})
export class UserOverviewComponent implements OnInit {
  users: UserPage = new UserPage();

  constructor(private userService: UserService, private snackBar: SnackBarService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.getUsers();
  }

  getServerData(pageEvent: PageEvent) {
    this.userService.getUsers(pageEvent.pageIndex, pageEvent.pageSize)
      .subscribe((users: UserPage) => this.users = users);
  }

  sendPasswordSetMail(id: number) {
    this.userService.sendPasswordSetMail(id).subscribe(
      () => this.snackBar.showMessage('Email was sent to user'),
      () => this.snackBar.showMessage('An error occurred while sending the email'));
  }

  openAddUserDialog() {
    const dialogRef = this.dialog.open(UserFormComponent);

    dialogRef.afterClosed().subscribe(result => {
      this.getUsers();
    });
  }

  private getUsers() {
    this.userService.getUsers()
      .subscribe((users: UserPage) => this.users = users);
  }

}
