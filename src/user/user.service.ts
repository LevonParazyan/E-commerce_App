import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserInterface } from './interface/user.interface';
import { UserDocument } from './schema/user.schema';
import { HttpException } from '@nestjs/common';

@Injectable()
export class UserService {
  constructor(
    @InjectModel('User')
    private readonly userModel: Model<UserDocument>,
  ) {}

  async create(payload: UserInterface) {
    const exists = this.userModel.findOne({ email: payload.email });
    if (!exists) {
      throw new ConflictException(
        `User with email:${payload.email} already exists`,
      );
    }
    try {
      payload.password = await bcrypt.hash(payload.password, 10);
      const user = new this.userModel(payload);
      await user.save();
      return {
        message: 'User was successfully created',
        user,
      };
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }

  async saveRefreshToken(userId: string, refreshToken: string): Promise<void> {
    const filter = { _id: userId };
    const update = { refreshToken: refreshToken };
    await this.userModel.findOneAndUpdate(filter, update);
  }

  async findAll() {
    try {
      const users = await this.userModel.find();
      return {
        message: 'The list of users',
        users,
      };
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }

  async findOne(id: string) {
    try {
      const user = this.userModel.findOne({ id });
      if (!user) {
        throw new ConflictException(`User with id: ${id} was not found`);
      }
      return {
        message: `The user with id: ${id}`,
        user,
      };
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }

  async getUserByEmail(email: string) {
    const user = await this.userModel.findOne({ email });
    if (!user) {
      throw new HttpException('User is not found', 404);
    }
    return user;
  }

  async update(id: string, payload: UserInterface) {
    const user = this.userModel.findOne({ id });
    if (!user) {
      throw new ConflictException(`User with id: ${id} was not found`);
    }
    try {
      const updatedUser = this.userModel
        .findByIdAndUpdate(id, payload, {
          new: true,
        })
        .exec();
      return {
        message: `User with id: ${id} was updated`,
        updatedUser,
      };
    } catch (err) {
      console.log(err);

      throw new BadRequestException(err.message);
    }
  }

  async remove(id: string) {
    const user = this.userModel.findOne({ id });
    if (!user) {
      throw new ConflictException(`User with id: ${id} was not found`);
    }
    try {
      const deletedUser = this.userModel.findByIdAndDelete(id).exec();
      return {
        message: `User with id: ${id} was deleted`,
        deletedUser,
      };
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }
}
