import { HttpStatus, Injectable } from '@nestjs/common';
import { DatabaseService } from './../database/database.service';
import { ApiError } from 'src/common/apiError';
import { env } from 'process';
import { UserSignInDto } from './dto/auth.user.signin.dto';
import { ProfileDto } from './dto/auth.user.profile.dto';
import { JwtService } from '@nestjs/jwt';
import { Prisma } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(
    private readonly databaseService: DatabaseService,
    private readonly jwtService: JwtService,
  ) {}
  async signUp(createUserDto: Prisma.UserCreateInput) {
    try {
      const newUser = await this.databaseService.user.create({
        data: createUserDto,
      });
      const token = await this.signToken(newUser.userID);
      return { token, id: newUser.userID };
    } catch (error) {
      throw new ApiError('User already exists', HttpStatus.BAD_REQUEST);
    }
  }
  async signIn(userSignInDto: UserSignInDto) {
    // use @nestjs/jwt

    // extract the username and password
    const { username, password } = userSignInDto;

    // 1) Check if the username and password are supplied
    if (!username || !password) {
      throw new ApiError(
        'Please enter your email and password',
        HttpStatus.BAD_REQUEST,
      );
    }

    // 2) find the user from the db
    const user = await this.databaseService.user.findFirst({
      where: { username },
    });
    if (!user) {
      throw new ApiError('User does not exist', HttpStatus.NOT_FOUND);
    }

    // 3) create a jwt token and send it to the user
    const userToken = await this.signToken(user.userID);

    return { userToken };
  }

  async getProfile(user: ProfileDto) {
    return await this.databaseService.user.findFirst({
      where: { userID: user.id },
    });
  }

  private async signToken(id: string) {
    return await this.jwtService.signAsync(
      { id },
      { expiresIn: env.JWT_EXPIRES_IN },
    );
  }
}
