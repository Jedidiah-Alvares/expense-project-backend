import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Users, UsersDocument } from './schema/user-schema';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(Users.name) private userModel: Model<UsersDocument>,
  ) {}

  // add new users
  async create(user: Users) {
    const newUser = new this.userModel(user);
    return await newUser.save();
  }

  // verify username for sign up feature
  async getByname(name: string) {
    return await this.userModel.find({ name: name });
  }

  // verify legitimate users for sign in feature
  async verify(user: Users) {
    return await this.userModel.find({
      name: user.name,
      password: user.password,
    });
  }
}
