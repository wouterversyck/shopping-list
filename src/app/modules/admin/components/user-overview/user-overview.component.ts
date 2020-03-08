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

  getUsers(pageNumber: number = 0, size: number = 25) {
    this.userService.getUsers(pageNumber, size)
      .subscribe((users: UserPage) => this.users = users);
  }

  getUsersByPageEvent(pageEvent: PageEvent) {
    this.getUsers(pageEvent.pageIndex, pageEvent.pageSize);
  }

  sendPasswordSetMail(id: number) {
    this.userService.sendPasswordSetMail(id).subscribe(
      () => this.snackBar.showMessage('Email was sent to user'),
      () => this.snackBar.showMessage('An error occurred while sending the email'));
  }

  openAddUserDialog() {
    const dialogRef = this.dialog.open(UserFormComponent);

    dialogRef.afterClosed().subscribe(result => {
      this.getUsers(this.users.number, this.users.size);
    });
  }

}
