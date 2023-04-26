import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Users, UsersDocument } from './schema/user-schema';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(Users.name) private userModel: Model<UsersDocument>,
  ) {
    console.log(Users.name);
  }

  async getAll() {
    return await this.userModel.find().exec();
  }
}
