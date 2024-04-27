import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserSignInDto } from './dto/auth.user.signin.dto';
import { AuthService } from './auth.service';
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  login(@Body() userSignInDto: UserSignInDto) {
    const { username, password } = userSignInDto;
    return this.authService.signIn(username, password);
  }
}
