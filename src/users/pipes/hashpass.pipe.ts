import {
  ArgumentMetadata,
  HttpException,
  HttpStatus,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { CreateEmailUserDto } from 'src/users/dtos';

@Injectable()
export class HashpassPipe implements PipeTransform {
  async transform(
    createUserDto: CreateEmailUserDto,
    metadata: ArgumentMetadata,
  ) {
    try {
      if (createUserDto.password) {
        const hash = await bcrypt.hash(createUserDto.password, 10);
        createUserDto.password = hash;
      }
      return createUserDto;
    } catch (error) {
      throw new HttpException('Error on pipe', HttpStatus.CONFLICT);
    }
  }
}
