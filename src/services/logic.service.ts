import { Injectable } from '@nestjs/common';

import { TwitterService } from './twitter.service';
import { GraphService } from './graph.service';

import { TwitterUser } from '../interfaces/twitter-user';

@Injectable()
export class LogicService {

  constructor(
    private readonly twitterService: TwitterService,
    private readonly graphService: GraphService
  ) {}

  async getCommonFollowers(users: string[]): Promise<string[]> {
    const result = await this.graphService.findUsers(users);

    const existingUsers = users.filter(x => result.find(y => y._fields[0] == x));
    const newUsers = users.filter(x => !result.find(y => y._fields[0] == x));

    if (newUsers.length > 0) {
      const followers: TwitterUser[] = await Promise.all(
        newUsers.map(x => this.twitterService.getFollowers(x))
      );

      await Promise.all(
        followers.map(async (x) =>  {
          await this.graphService.createUser(x.username)
          console.log(x);
          return Promise.all(x.followers.map(y => this.graphService.createFollower(x.username, y)));
        })
      );
    }

    const common = await this.graphService.findCommonFollowers(users[0], users[1]);

    return common.map(x => x._fields[0].properties.username);
  }
}
