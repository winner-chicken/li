import { PartialType } from '@nestjs/mapped-types';
import {
  IsString,
  IsEmail,
  IsUrl,
  IsNotEmpty,
  IsDate,
  IsOptional,
} from 'class-validator';
import { Type } from 'class-transformer';
import { User } from '../entities/user.entity';

export class UserDto extends User {}

export class CreateSocialUserDto extends PartialType(User) {
  @IsString({ message: 'El nombre debe ser un texto' })
  @IsNotEmpty({ message: 'El nombre no puede estar vacío' })
  firstName: string;

  @IsString({ message: 'El apellido debe ser un texto' })
  @IsNotEmpty({ message: 'El apellido no puede estar vacío' })
  lastName: string;

  @IsString({ message: 'El correo electrónico debe ser un texto' })
  @IsEmail({}, { message: 'El correo electrónico debe ser válido' })
  email: string;

  @IsString({ message: 'La imagen de perfil debe ser un texto' })
  @IsUrl({}, { message: 'La imagen de perfil debe ser una URL válida' })
  profilePicture: string;

  @IsOptional()
  @IsString({ message: 'El ID de Facebook debe ser un texto' })
  facebookId?: string;

  @IsOptional()
  @IsString({ message: 'El ID de Google debe ser un texto' })
  googleId?: string;

  @IsOptional()
  @IsString({ message: 'El ID de Apple debe ser un texto' })
  appleId?: string;

  @IsDate({ message: 'La fecha de nacimiento debe ser una fecha válida' })
  @Type(() => Date)
  @IsNotEmpty({ message: 'La fecha de nacimiento no puede estar vacía' })
  birthDate: Date;
}

export class CreateEmailUserDto extends PartialType(User) {
  @IsString({ message: 'El nombre debe ser un texto' })
  @IsNotEmpty({ message: 'El nombre no puede estar vacío' })
  firstName: string;

  @IsString({ message: 'El apellido debe ser un texto' })
  @IsNotEmpty({ message: 'El apellido no puede estar vacío' })
  lastName: string;

  @IsString({ message: 'La contraseña debe ser un texto' })
  @IsNotEmpty({ message: 'La contraseña no puede estar vacía' })
  password: string;

  @IsEmail({}, { message: 'El correo electrónico debe ser válido' })
  @IsNotEmpty({ message: 'El correo electrónico no puede estar vacío' })
  email: string;

  @IsDate({ message: 'La fecha de nacimiento debe ser una fecha válida' })
  @Type(() => Date)
  @IsNotEmpty({ message: 'La fecha de nacimiento no puede estar vacía' })
  birthDate: Date;
}

export class UpdateUserDto extends PartialType(UserDto) {}
