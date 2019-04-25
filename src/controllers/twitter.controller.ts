import { Controller, Get, Query } from '@nestjs/common';

import { LogicService } from '../services/logic.service';

@Controller('twitter')
export class TwitterController {

  constructor(private readonly logicService: LogicService) {}

  @Get('followers')
  getCommonFollowers(@Query('users') users: string[]) {
    if (!Array.isArray(users) || users.length < 2) return [];
    return this.logicService.getCommonFollowers(users);
  }
}
