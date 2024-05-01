import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
// import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthGuard implements CanActivate {
  // constructor(private readonly userService: UsersService) {}

  canActivate(context: ExecutionContext): boolean {
    const [req] = context.getArgs();
    // figure out how to get the user from the db, because we want to check their userType here too
    return true;
  }
}
