import { Controller, Get, Param } from '@nestjs/common';

import { TwitterService } from '../services/twitter.service';

@Controller('twitter')
export class TwitterController {

  constructor(private readonly twitterService: TwitterService) {}

  @Get('/:usernameA/:usernameB/followers')
  getFollowers(
    @Param('usernameA') usernameA: string,
    @Param('usernameB') usernameB: string
  ) {
    return this.twitterService.getFollowers(usernameA);
  }
}
