import { Schema, Prop } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
@Schema({ timestamps: true, id: false })
export class UserBaseSchema extends Document {
  @Prop({ unique: true, default: uuidv4 })
  uk: string;
  @Prop({ required: true, default: Date.now })
  createdAt: Date;
  @Prop({ required: true, default: Date.now })
  updatedAt: Date;
}
