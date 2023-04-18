import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { UserService } from '../user/user.service';
import { LoginUserDto } from './dto/login.dto';
import { AuthService } from './auth.service';
import { IUserData } from './interface/user-data.interface';
import { LocalAuthGuard } from './guards/local-auth.guard';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UserService,
  ) {}

  @Post('login')
  @ApiOkResponse({ description: 'You have successfully logged in.' })
  @ApiUnauthorizedResponse({ description: 'User is not authorized' })
  @ApiBadRequestResponse({ description: 'Bad Request.' })
  //@UseGuards(LocalAuthGuard)
  async login(@Body() userData: IUserData) {
    return this.authService.login(userData);
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
