import { Controller, Post, Body } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { UserService } from '../user/user.service';
import { LoginUserDto } from './dto/login.dto';
import { AuthService } from './auth.service';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UserService,
  ) {}

  @Post('login')
  @ApiCreatedResponse({ description: 'You have successfully logged in.' })
  @ApiBadRequestResponse({ description: 'Bad Request.' })
  async login(@Body() authDto: LoginUserDto) {
    return this.authService.login(authDto);
  }

  @Post('register')
  @ApiOkResponse({
    status: 200,
    description: 'The user has been successfully registered.',
  })
  @ApiBadRequestResponse({ description: 'Bad Request.' })
  async register(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }
}
