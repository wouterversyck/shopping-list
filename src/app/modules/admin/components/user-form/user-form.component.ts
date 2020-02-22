import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '@core/services/user/user.service';
import { Role } from '@core/services/user/models/role.model';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {
  userForm = new FormGroup({
    username: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    role: new FormControl()
  });

  roles: Role[];

  constructor(private userService: UserService, private formBuilder: FormBuilder) {
    userService.getRoles().subscribe((roles: Role[]) => this.roles = roles);
  }

  ngOnInit(): void {
  }

  onSubmit() {
    this.userService.addUser(this.userForm.value).subscribe();
  }

  get showError() {
    return false;
  }

  get username() {
    return this.userForm.controls.username;
  }

  get email() {
    return this.userForm.controls.email;
  }

}
