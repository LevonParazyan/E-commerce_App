import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { UserDocument } from 'src/user/schema/user.schema';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userService.getUserByEmail(email);
    if (user && (await bcrypt.compare(password, user.password))) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { email: user.email, sub: user.userId };
    let refreshToken = null;
    if (user && user.userId) {
      refreshToken = await this.generateRefreshToken(user.userId);
      await this.userService.saveRefreshToken(user.id, refreshToken);
    }
    return {
      access_token: this.generateAccessToken(payload),
      refresh_token: refreshToken,
    };
  }

  async generateAccessToken(payload: any) {
    const secretKey = process.env.JWT_SECRET;
    const options = {
      expiresIn: '15m',
    };
    return jwt.sign(payload, secretKey, options);
  }

  async generateRefreshToken(user: UserDocument) {
    const payload = { sub: user.id };
    const refreshToken = jwt.sign(
      payload,
      process.env.JWT_REFRESH_TOKEN_SECRET,
      { expiresIn: '7d' },
    );
    await this.userService.saveRefreshToken(user.id, refreshToken);
    return refreshToken;
  }

  async refreshToken(refreshToken: string): Promise<string> {
    try {
      const decoded = this.jwtService.verify(refreshToken, {
        ignoreExpiration: true,
      });
      const userId = decoded.sub;
      return this.generateAccessToken(userId);
    } catch (err) {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }
}
