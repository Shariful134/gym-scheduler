import { Model } from 'mongoose';
import { USER_ROLE } from './auth.constant';

export interface IUsers {
  _id?: string;
  name: string;
  email: string;
  password: string;
  role: 'Admin' | 'Trainer' | 'Trainee';
  createdAt: string;
  updatedAt: string;
}

export type TUserLogin = {
  email: string;
  password: string;
};

//create statick method for using  model
export interface UserModel extends Model<IUsers> {
  isUserExistsByEmail(email: string): Promise<IUsers>;
  isPasswordMatched(
    planTextPassword: string,
    hashedPassword: string,
  ): Promise<boolean>;
}

export type TUserRole = keyof typeof USER_ROLE;
