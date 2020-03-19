import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ProfileService } from '@core/services/user/profile.service';

@Component({
  selector: 'app-password-set',
  templateUrl: './password-set.component.html',
  styleUrls: ['./password-set.component.scss']
})
export class PasswordSetComponent implements OnInit {

  userForm = new FormGroup({
    oldPassword: new FormControl('', Validators.required),
    newPassword: new FormControl('', Validators.required),
    confirmNewPassword: new FormControl('', Validators.required)
  });

  private token: string;

  constructor(private route: ActivatedRoute, private profileService: ProfileService) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.token = params['token'];
    });
  }

  onSubmit() {
    this.profileService.updatePassword(this.userForm.value)
      .subscribe();
  }

  get oldPassword() {
    return this.userForm.controls.oldPassword;
  }

  get newPassword() {
    return this.userForm.controls.newPassword;
  }

  get confirmNewPassword() {
    return this.userForm.controls.confirmNewPassword;
  }
}
