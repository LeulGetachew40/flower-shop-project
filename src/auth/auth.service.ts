import { Injectable } from '@nestjs/common';
import { DatabaseService } from './../database/database.service';
import { ApiError } from 'src/common/apiError';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { env } from 'process';

@Injectable()
export class AuthService {
  constructor(private readonly databaseService: DatabaseService) {}
  async signIn(username: string, password: string) {
    if (!username || !password) {
      throw new ApiError('Please enter your email and password', 400);
    }
    const user = await this.databaseService.user.findFirst({
      where: { username },
    });
    if (!user) {
      throw new ApiError('User does not exist', 404);
    }
    const jwtToken = jwt.sign({ id: user.userID }, env.JWT_SECRET, {
      expiresIn: env.JWT_EXPIRES_IN,
    });
    return { userToken: jwtToken };
  }
}
