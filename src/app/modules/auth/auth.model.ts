import { model, Schema } from 'mongoose';
import bcrypt from 'bcrypt';

import config from '../../config';
import { IUsers, UserModel } from './auth.interface';

const usersSchema = new Schema<IUsers>(
  {
    name: {
      type: String,
      required: [true, 'Name is Required'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Email is Required'],
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: [true, 'Password is Required'],
      minlength: [6, 'Password must be 6 characters'],
      select: 0,
      trim: true,
    },
    role: {
      type: String,
      enum: ['Admin', 'Trainer', 'Trainee'],
      default: 'Admin',
    },
  },
  {
    timestamps: true,
  },
);

// hashing password and save into DB
usersSchema.pre('save', async function (next) {
  const user = this;
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds),
  );
  next();
});

usersSchema.statics.isUserExistsByEmail = async function (email: string) {
  return await User.findOne({ email }).select('+password');
};

// check password
usersSchema.statics.isPasswordMatched = async function (
  planTextPassword,
  hashedPassword,
) {
  return await bcrypt.compare(planTextPassword, hashedPassword);
};

export const User = model<IUsers, UserModel>('User', usersSchema);
