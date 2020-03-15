import { Component, OnInit } from '@angular/core';
import { UserService } from '@core/services/user/user.service';
import { UserPage } from '@core/services/user/models/UserPage.model';
import { PageEvent } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { UserFormComponent } from '@app/modules/admin/components/dialogs/user-form/user-form.component';
import { SnackBarService } from '@core/services/snack-bar/snack-bar.service';
import { BehaviorSubject} from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-user-overview',
  templateUrl: './user-overview.component.html',
  styleUrls: ['./user-overview.component.scss']
})
export class UserOverviewComponent implements OnInit {
  userPageSubject: BehaviorSubject<UserPage> = new BehaviorSubject<UserPage>(new UserPage());

  constructor(private userService: UserService, private snackBar: SnackBarService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers(pageNumber: number = 0, size: number = 10) {
    this.userService.getUsers(pageNumber, size).subscribe(element => this.userPageSubject.next(element));
  }

  getUsersByPageEvent(pageEvent: PageEvent) {
    this.getUsers(pageEvent.pageIndex, pageEvent.pageSize);
  }

  sendPasswordSetMail(id: number) {
    this.userService.sendPasswordSetMail(id).subscribe(
      () => this.snackBar.showMessage('Email was sent to user'),
      () => this.snackBar.showMessage('An error occurred while sending the email'));
  }

  deleteUser(id: number, username: string) {
    if (confirm(`Delete user ${username}`)) {
      this.userService.deleteUser(id).subscribe(
        success => this.getUsers(this.userPageSubject.getValue().number, this.userPageSubject.getValue().size),
        error => this.handleError(error)
      );
    }
  }

  openAddUserDialog() {
    const dialogRef = this.dialog.open(UserFormComponent);

    dialogRef.afterClosed().subscribe(result => {
      this.getUsers(this.userPageSubject.getValue().number, this.userPageSubject.getValue().size);
    });
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 409) {
      this.snackBar.showMessage('You cannot delete the user you are logged in with');
    } else {
      this.snackBar.showMessage('Something went wrong while deleting user');
    }
  }
}
