import { async, ComponentFixture, inject, TestBed } from '@angular/core/testing';

import { UserFormComponent } from './user-form.component';
import { UserService } from '@core/services/user/user.service';
import { CommonModule } from '@angular/common';
import { AppModule } from '@app/app.module';
import { MaterialModule } from '@core/material/material.module';
import { RouterTestingModule } from '@angular/router/testing';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { of, throwError } from 'rxjs';
import { HttpResponse } from '@angular/common/http';
import { SnackBarService } from '@core/services/snack-bar/snack-bar.service';

describe('UserFormComponent', () => {
  let component: UserFormComponent;
  let fixture: ComponentFixture<UserFormComponent>;

  const EMAIL = 'test@test.com';
  const USERNAME = 'woopsel';
  const ROLE = 'ADMIN';

  const userServiceStub = {
    getUsers: () => {},
    addUser: (user) => {},
    getRoles: () => of([ { id: 1, name: 'ADMIN' }, { id: 2, name: 'USER' }]),
    usernameExists: () => of(false),
    emailExists: () => of(false)
  };

  afterEach(() => {
    fixture.destroy();
  });
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserFormComponent ],
      providers: [
        { provide: UserService, useValue: userServiceStub},
        SnackBarService,
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MatDialogRef, useValue: { close: () => {} } }
      ],
      imports: [
        CommonModule,
        AppModule,
        MaterialModule,
        RouterTestingModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create',
    inject([UserService, SnackBarService], (userService: UserService) => {
      spyOn(userService, 'getRoles');
      expect(component).toBeTruthy();
    })
  );

  it('should call userService and show proper message when user is added successfully',
    inject([UserService, SnackBarService], (userService: UserService, snackBar: SnackBarService) => {
      setForm(component, USERNAME, EMAIL, ROLE);
      spyOn(userService, 'getRoles');
      spyOn(userService, 'addUser').and.returnValue(of(new HttpResponse()));
      spyOn(snackBar, 'showMessage');

      component.onSubmit();

      expect(userService.addUser).toHaveBeenCalledWith({ username: USERNAME, email: EMAIL, role: ROLE });
      expect(snackBar.showMessage).toHaveBeenCalledWith('User created and mail sent');
    })
  );

  it('should call userService and show proper message when user is added but 207 is returned (email not sent)',
    inject([UserService, SnackBarService], (userService: UserService, snackBar: SnackBarService) => {
      setForm(component, USERNAME, EMAIL, ROLE);
      spyOn(userService, 'getRoles');
      spyOn(userService, 'addUser').and.returnValue(of(new HttpResponse({ status: 207 })));
      spyOn(snackBar, 'showMessage');

      component.onSubmit();

      expect(userService.addUser).toHaveBeenCalledWith({ username: USERNAME, email: EMAIL, role: ROLE });
      expect(snackBar.showMessage).toHaveBeenCalledWith('User created but mail sending failed');
    })
  );

  it('should call userService and show proper message when user added but an error occurred',
    inject([UserService, SnackBarService], (userService: UserService, snackBar: SnackBarService) => {
      setForm(component, USERNAME, EMAIL, ROLE);
      spyOn(userService, 'getRoles');
      spyOn(userService, 'addUser').and.returnValue(throwError(new HttpResponse({ status: 500})));
      spyOn(snackBar, 'showMessage');

      component.onSubmit();

      expect(userService.addUser).toHaveBeenCalledWith({ username: USERNAME, email: EMAIL, role: ROLE });
      expect(snackBar.showMessage).toHaveBeenCalledWith('An error occurred while creating the user');
    })
  );
});


function setForm(component: UserFormComponent, username, email, role) {
  component.userForm.controls.username.setValue(username);
  component.userForm.controls.email.setValue(email);
  component.userForm.controls.role.setValue(role);
}
