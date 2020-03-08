import { inject, TestBed } from '@angular/core/testing';

import { UserService } from './user.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { UserPage } from '@core/services/user/models/UserPage.model';
import { User } from '@core/services/user/models/user.model';
import { HttpResponse } from '@angular/common/http';
import { Role } from '@core/services/user/models/role.model';

describe('UserService', () => {

  beforeEach(() => TestBed.configureTestingModule({
    imports: [ HttpClientTestingModule ],
    providers: [ UserService ]
  }));

  it('should be created', inject([UserService],
    (service: UserService) => {
    expect(service).toBeTruthy();
  }));

  it('should return userPage with proper default params and call correct url when getUsers is called',
    inject([UserService, HttpTestingController], (service: UserService, httpMock: HttpTestingController) => {
    const data: UserPage = createUserPage();

    service.getUsers().subscribe((response: UserPage) => expect(response).toEqual(data));

    const req = httpMock.expectOne('/api/admin/users?page=0&size=25');
    req.flush(data);

    expect(req.request.method).toEqual('GET');
    httpMock.verify();
  }));

  it('should return userPage, call correct url and set params as request params', inject([UserService, HttpTestingController],
    (service: UserService, httpMock: HttpTestingController) => {
    const data: UserPage = createUserPage();

    service.getUsers(2, 20).subscribe((response: UserPage) => expect(response).toEqual(data));

    const req = httpMock.expectOne('/api/admin/users?page=2&size=20');
    req.flush(data);

    expect(req.request.method).toEqual('GET');
    httpMock.verify();
  }));

  it('should post user and return created user and call correct url when add user is called', inject([UserService, HttpTestingController],
    (service: UserService, httpMock: HttpTestingController) => {
    const data: User = createUser();

    service.addUser(data).subscribe((response: HttpResponse<User>) => expect(response.body).toEqual(data));

    const req = httpMock.expectOne('/api/admin/users');
    req.flush(data);

    expect(req.request.method).toEqual('POST');
    expect(req.request.body).toEqual(data);
    httpMock.verify();
  }));

  it('should return roles and call correct url when getRoles is called', inject([UserService, HttpTestingController],
    (service: UserService, httpMock: HttpTestingController) => {
    const data: Role[] = [{ id: 1, name: 'USER'}, {id: 2, name: 'ADMIN'}];

    service.getRoles().subscribe((response: Role[]) => expect(response).toEqual(data));

    const req = httpMock.expectOne('/api/admin/roles');
    req.flush(data);

    expect(req.request.method).toEqual('GET');
    httpMock.verify();
  }));

  it('should return response and call correct url when usernameExists is called', inject([UserService, HttpTestingController],
    (service: UserService, httpMock: HttpTestingController) => {
    const username = 'username';

    service.usernameExists(username).subscribe((response: boolean) => expect(response).toEqual(true));

    const req = httpMock.expectOne(`/api/admin/users/exists?username=${username}`);
    req.event(new HttpResponse<boolean>({body: true}));

    expect(req.request.method).toEqual('GET');
    httpMock.verify();
  }));

  it('should return response and call correct url when emailExists is called', inject([UserService, HttpTestingController],
    (service: UserService, httpMock: HttpTestingController) => {
    const email = 'test@gmail.com';

    service.emailExists(email).subscribe((response: boolean) => expect(response).toEqual(true));

    const req = httpMock.expectOne(`/api/admin/users/exists?email=${email}`);
    req.event(new HttpResponse<boolean>({body: true}));

    expect(req.request.method).toEqual('GET');
    httpMock.verify();
  }));

  it('should pass proper params and call correct url when sendPasswordSetMail is called', inject([UserService, HttpTestingController],
    (service: UserService, httpMock: HttpTestingController) => {

    service.sendPasswordSetMail(5).subscribe();

    const req = httpMock.expectOne(`/api/admin/users/passwordSet/5`);
    req.event(new HttpResponse<void>());

    expect(req.request.method).toEqual('GET');
    httpMock.verify();
  }));
});

function createUserPage(): UserPage {
  return {
    content: [{
      email: 'email',
      username: 'username',
      id: 1,
      role: 'USER'
    }],
    first: true,
    last: false,
    number: 0,
    totalPages: 2,
    size: 2,
    totalElements: 4
  };
}

function createUser(): User {
  const user = new User();
  user.email = 'test@gmail.com';
  user.username = 'username';
  user.role = 'USER';

  return user;
}
