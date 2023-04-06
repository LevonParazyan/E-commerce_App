import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { LoginUserDto } from './dto/login.dto';
import { IUserData } from './interface/user-data.interface';

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

  async login(userData: IUserData) {
    const payload = { email: userData.email, id: userData.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
