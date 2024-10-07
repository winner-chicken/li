import { Body, Controller, Post, UsePipes } from '@nestjs/common';
import { UsersService } from './users.service';
import { HashpassPipe } from './pipes/hashpass.pipe';
import { CreateEmailUserDto, CreateSocialUserDto } from './dtos';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @Post('register')
  @UsePipes(new HashpassPipe())
  async createEmailUser(@Body() createUserDto: CreateEmailUserDto) {
    const userCreated =
      await this.usersService.createUserByEmail(createUserDto);
    if (userCreated) {
      const { message, token } = userCreated as {
        message: string;
        token: string;
      };
      if (message === 'User already exists but is not active') {
        return {
          message,
          token,
        };
      }
      return {
        message: 'User created successfully',
        status: 'code-sended',
        token,
      };
    }
  }
  @Post('register-social')
  async createSocialUser(@Body() createUserDto: CreateSocialUserDto) {
    const userCreated =
      await this.usersService.createUserBySocial(createUserDto);
    if (userCreated) {
      const { message, token } = userCreated as {
        message: string;
        token: string;
      };
      if (message === 'User already exists but is not active') {
        return {
          message,
          token,
        };
      }
      return {
        message: 'User created successfully',
        status: 'code-sended',
        token,
      };
    }
  }
}
