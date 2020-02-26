import { User } from '@core/services/user/models/user.model';

export class UserPage {
  content: User[];
  totalPages: number;
  size: number;
  totalElements: number;
}
