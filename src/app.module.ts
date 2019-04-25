import { Module } from '@nestjs/common';

import { TwitterController } from './controllers/twitter.controller';
import { TwitterService } from './services/twitter.service';
import { GraphService } from './services/graph.service';
import { LogicService } from './services/logic.service';
import { neo4jProvider } from './providers/neo4j.provider';

@Module({
  imports: [],
  controllers: [
    TwitterController
  ],
  providers: [
    neo4jProvider,
    LogicService,
    TwitterService,
    GraphService
  ],
})
export class AppModule {}
