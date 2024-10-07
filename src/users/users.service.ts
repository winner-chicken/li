import {
  HttpException,
  Injectable,
  HttpStatus,
  Inject,
  forwardRef,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './entities/user.entity';
import { CreateEmailUserDto, CreateSocialUserDto } from './dtos';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService,
  ) {}
  /**
   * @param email
   * @returns  boolean
   * @description Check if a user exists in the database by email
   */
  async checkIfUserExists(email: string): Promise<boolean> {
    const user = await this.userModel.findOne({ email });
    return !!user;
  }

  async checkIfUserExistsByPhoneNumber(phoneNumber: string): Promise<boolean> {
    const user = await this.userModel.findOne({ phoneNumber });
    return !!user;
  }
  /**
   * @param CreateEmailUserDto
   * @returns Promise<User>
   * @description Create a new user
   * @throws HttpException if user already exists
   * @throws HttpException if user cannot be created
   */
  async createUserByEmail(
    createUserDto: CreateEmailUserDto,
  ): Promise<unknown | { message: string }> {
    try {
      const exists = await this.checkIfUserExists(createUserDto.email);
      if (exists) {
        const user = await this.getUserByEmail(createUserDto.email);
        if (!user?.isActive) {
          console.log('User already exists 2');
          return {
            message: 'User already exists but is not active',
            token: this.authService.generateToken(user),
          };
        }
        throw new HttpException('User already exists', HttpStatus.CONFLICT);
      } else {
        const user = new this.userModel(createUserDto);
        await user.save();
        const token = this.authService.generateToken(user);
        return { user, token };
      }
    } catch (error) {
      console.error('Error creating user:', error);
      throw new HttpException(
        error.message || 'User cannot be created',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  /**
   * @param email
   * @returns Promise<User>
   * @description Get a user by email
   */
  async getUserByEmail(email: string): Promise<User> {
    return this.userModel.findOne({ email });
  }

  async createUserBySocial(
    createUserDto: CreateSocialUserDto,
  ): Promise<unknown> {
    try {
      const exists = await this.checkIfUserExists(createUserDto.email);

      if (exists) {
        const user = await this.getUserByEmail(createUserDto.email);
        if (!user?.isActive) {
          console.log('User already exists 2');
          return {
            message: 'User already exists but is not active',
            token: this.authService.generateToken(user),
          };
        }
        throw new HttpException('User already exists', HttpStatus.CONFLICT);
      } else {
        const user = new this.userModel(createUserDto);
        await user.save();
        const token = this.authService.generateToken(user);
        return {
          user,
          token,
        };
      }
    } catch (error) {
      console.error('Error creating user:', error);
      throw new HttpException(
        error.message || 'User cannot be created',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
