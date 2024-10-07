import {
  forwardRef,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { createClerkClient } from '@clerk/backend';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UsersService)) private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  /*   async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(username);
    if (user && user.password === pass) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  } */

  generateToken(user: any) {
    const payload = { email: user.email, sub: user._id };
    return this.jwtService.sign(payload);
  }

  sendNumber() {
    return true;
  }

  validatePinCode(number: string, email: string) {
    console.log('number', number);
    return number === '123456';
  }

  generateRandomNumber() {
    return Math.floor(100000 + Math.random() * 900000);
  }

  async login(email: string, password: string) {
    const user = await this.usersService.getUserByEmail(email);
    if (!user) {
      throw new HttpException('User not found', HttpStatus.UNAUTHORIZED);
    }
    if (!user.password) {
      throw new HttpException(
        'Different signup method used, please login with the same method or reset your password',
        HttpStatus.UNAUTHORIZED,
      );
    }
    const isMatch = await bcrypt.compare(password, user.password);
    console.log(isMatch);
    if (!isMatch) {
      throw new HttpException('Invalid credentials', HttpStatus.ACCEPTED);
    }
    if (user.isActive) {
      return {
        message: 'User exists but is not active',
        status: 'inactive',
      };
    }
    const payload = {
      email: user.email,
      sub: user._id,
      name: user.firstName,
      lstName: user.lastName,
      isActive: user.isActive,
      balance: user.balance,
    };
    return {
      access_token: this.generateToken(payload),
    };
  }
  async validateIdSession(id: string): Promise<any> {
    try {
      const expoKey = 'sk_test_Q93j3qhp7pZGmuRcChOEh7XLd9uIWQnp6dRapbQNvc';
      const clerkClient = createClerkClient({
        secretKey: expoKey,
      });
      const session = await clerkClient.sessions.getSession(id);
      const userData = await clerkClient.users.getUser(session.userId);
      return userData;
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  async deleteSession(id: string): Promise<any> {
    try {
      const expoKey = 'sk_test_Q93j3qhp7pZGmuRcChOEh7XLd9uIWQnp6dRapbQNvc';
      const clerkClient = createClerkClient({
        secretKey: expoKey,
      });
      await clerkClient.sessions.revokeSession(id);
      return {
        message: 'Session closed successfully',
      };
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  async activeUser(email: string, code: string): Promise<any> {
    try {
      const user = await this.usersService.getUserByEmail(email);
      if (!user) {
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      }
      if (user.isActive) {
        return {
          message: 'User is already active',
        };
      }
      const isMatch = this.validatePinCode(code, email);
      if (!isMatch) {
        return {
          message: 'Invalid code',
        };
      }
      user.isActive = true;
      await user.save();
      return {
        message: 'User activated successfully',
      };
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
