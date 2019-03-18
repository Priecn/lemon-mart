import { Role } from 'src/app/auth/role.enum';

export interface IUser {
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  authorities: string[];
  role: Role;
  enabled: boolean;
}

export class User implements IUser {
  constructor(
    public username: string = null,
    public email: string = null,
    public firstName: string = null,
    public lastName: string = null,
    public authorities: string[] = null,
    public role: Role = Role.None,
    public enabled: boolean = false
  ) {}

  static BuildUser(user: IUser) {
    return new User(
      user.username,
      user.email,
      user.firstName,
      user.lastName,
      user.authorities,
      user.role,
      user.enabled
    );
  }

  get fullName() {
    return `${this.firstName} ${this.lastName}`;
  }
}
