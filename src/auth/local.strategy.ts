import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dto/login.dto';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({ usernameField: 'email', passwordField: 'password' });
  }
  async validate(authDto: LoginUserDto): Promise<any> {
    const user = await this.authService.validateUser(authDto);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}