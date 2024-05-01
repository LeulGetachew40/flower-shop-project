import {
  CanActivate,
  ExecutionContext,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { ApiError } from '../apiError';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class ProtectRoute implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest(); // context is a smarter version of middlewares because they know what will be executed next

    // 1) extract the token
    const token = this.getRequestToken(request.headers);

    if (!token) {
      throw new ApiError('Please log in', HttpStatus.UNAUTHORIZED);
    }
    const payload = await this.jwtService.verifyAsync(token); // only set the jwtVerifyOptions if we want to override properties that were passed from the module
    request.user = payload;
    return true;
  }
  private getRequestToken(header: {
    authorization?: string;
  }): string | undefined {
    const [type, token] = header?.authorization.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
