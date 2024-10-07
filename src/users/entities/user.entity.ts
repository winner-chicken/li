import { UserBaseSchema } from 'src/shared/entities/user.base.entity';
import { Schema, SchemaFactory, Prop } from '@nestjs/mongoose';

@Schema()
export class User extends UserBaseSchema {
  @Prop({ required: true })
  firstName: string;

  @Prop({ default: '' })
  middleName: string;

  @Prop({ required: true })
  lastName: string;

  @Prop({ default: '' })
  maternalSurname: string;

  @Prop({ required: true })
  birthDate: Date;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop()
  password: string;

  @Prop({ minlength: 10, maxlength: 10 })
  phoneNumber: string;

  @Prop({
    minlength: 16,
    maxlength: 16,
    match: /^\d{16}$/,
    default: '0000000000000000',
  })
  creditCardNumber: string;

  @Prop({ default: '' })
  bankInstitution: string;

  @Prop({ minlength: 3, maxlength: 4 })
  cvv: string;

  @Prop({ default: '' })
  profilePicture: string;

  @Prop({ default: false })
  isBanned: boolean;

  @Prop({ default: false })
  isActive: boolean;

  @Prop()
  verificationCode: string;

  @Prop()
  resetPasswordCode: string;

  @Prop({ default: 0.0, min: 0.0 })
  balance: number;

  @Prop()
  username: string;

  @Prop({ default: '' })
  expoToken: string;

  @Prop({ default: '' })
  state: string;

  @Prop({ default: '' })
  city: string;

  @Prop({ default: '' })
  address: string;

  @Prop({ minlength: 5, maxlength: 5, match: /^\d{5}$/, default: '00000' })
  postalCode: string;

  @Prop({ default: '' })
  country: string;

  @Prop({ default: '' })
  googleId: string;

  @Prop({ default: '' })
  facebookId: string;

  @Prop({ default: '' })
  appleId: string;

  @Prop({ default: 0.0 })
  latitude: number;

  @Prop({ default: 0.0 })
  longitude: number;
}

export const UserSchema = SchemaFactory.createForClass(User);
