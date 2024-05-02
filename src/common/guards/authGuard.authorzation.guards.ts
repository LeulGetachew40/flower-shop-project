import {
  Injectable,
  CanActivate,
  ExecutionContext,
  HttpStatus,
  SetMetadata,
} from '@nestjs/common';
import { UsersService } from './../../users/users.service';
import { ApiError } from '../apiError';
import { Role } from './../../auth/role.enum';
import { Reflector } from '@nestjs/core';
export function Roles(roles: Role[]) {
  return SetMetadata('userType', roles);
}

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly userService: UsersService,
    private reflector: Reflector,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const [req] = context.getArgs();
    // figure out how to get the user from the db, because we want to check their userType here too
    const user = await this.userService.findOne(req.user.id);
    if (!user) {
      throw new ApiError(
        'You are logged out please log in again',
        HttpStatus.UNAUTHORIZED,
      );
    }
    // req.user = user;
    const roles = this.reflector.get('userType', context.getHandler()); // reflector has access to the metadata about the handler
    if (!roles.includes(user.userType)) {
      throw new ApiError(
        'You are unauthorized to view this resource',
        HttpStatus.FORBIDDEN,
      );
    }
    return true;
  }
}
