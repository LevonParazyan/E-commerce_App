import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiBadRequestResponse, ApiBody, ApiConflictResponse, ApiCreatedResponse, ApiNotFoundResponse, ApiOkResponse, ApiParam, ApiTags } from '@nestjs/swagger';

@Controller('user')
@ApiTags('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiCreatedResponse({ description: 'User was successfully created' })
  @ApiConflictResponse({ description: 'User with that email already exists' })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @ApiOkResponse({ status: 200, type: CreateUserDto, isArray: true })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @Get()
  async findAll() {
    return this.userService.findAll();
  }

  @ApiParam({ name: 'id', type: String })
  @ApiOkResponse({ status: 200, type: CreateUserDto })
  @ApiNotFoundResponse({ description: 'User was not found' })
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @ApiParam({ name: 'id', type: String })
  @ApiBody({
    description: 'Update user.',
    type: UpdateUserDto,
  })
  @ApiOkResponse({
    status: 200,
    type: UpdateUserDto,
    description: 'User was successfully updated',
  })
  @ApiNotFoundResponse({ description: 'User is not found' })
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @ApiParam({ name: 'id', type: String })
  @ApiOkResponse({
    status: 200,
    description: 'User was successfully deleted',
  })
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }
}
