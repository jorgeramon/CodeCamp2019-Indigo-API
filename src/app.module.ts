import { Module } from '@nestjs/common';

import { TwitterService } from './services/twitter.service';

@Module({
  imports: [],
  controllers: [],
  providers: [
    TwitterService
  ],
})
export class AppModule {}
