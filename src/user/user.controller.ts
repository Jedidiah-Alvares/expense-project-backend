import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { Users } from './schema/user-schema';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  // add new users
  @Post()
  async create(@Body() user: Users) {
    return await this.userService.create(user);
  }

  // verify legitimate users for sign in feature
  @Post('/verify')
  async verify(@Body() user: Users) {
    return (await this.userService.verify(user)).length;
  }

  // verify username for sign up feature
  @Get('/:name')
  async getByName(@Param('name') name: string) {
    return (await this.userService.getByname(name)).length;
  }
}
