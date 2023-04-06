import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { LoginUserDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(authDto: LoginUserDto): Promise<any> {
    const user = await this.userService.getUserByEmail(authDto.email);
    if (user && (await bcrypt.compare(authDto.password, user.password))) {
      const { email, id } = user;
      return { email, id };
    }
    return null;
  }

  async login(authDto: LoginUserDto) {
    const validUser = await this.validateUser(authDto);

    if (!validUser) {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    }
    const payload = { email: validUser.email, id: validUser.id };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}