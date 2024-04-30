import {
  Body,
  Controller,
  Post,
  Get,
  UseGuards,
  Request,
  ValidationPipe,
  UsePipes,
} from '@nestjs/common';
import { UserSignInDto } from './dto/auth.user.signin.dto';
import { AuthService } from './auth.service';
import { ProtectRoute } from './../common/middlewares/authorization.middleware';
import { CreateUserDto } from './../users/dto/user.create.dto';
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  signIn(@Body() userSignInDto: UserSignInDto) {
    return this.authService.signIn(userSignInDto);
  }

  @UseGuards(ProtectRoute)
  @Get('/profile')
  getProfile(@Request() request: any) {
    return this.authService.getProfile(request.user);
  }

  @Post('/signup')
  @UsePipes(new ValidationPipe({ whitelist: true }))
  signUp(@Body() createUserDto: CreateUserDto) {
    return this.authService.signUp(createUserDto);
  }
}
