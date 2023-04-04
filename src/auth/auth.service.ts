import { HttpException, HttpStatus,Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginUserDto } from './dto/login.dto';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(loginUserDto: LoginUserDto): Promise<any> {
    const user = await this.userService.getUserByEmail(loginUserDto.email);
    if (user && (await bcrypt.compare(loginUserDto.password, user.password))) {
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
