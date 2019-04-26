import { Injectable } from '@nestjs/common';
import * as Twit from 'twit';
import { environment } from '../environment';

import { TwitterUser } from '../interfaces/twitter-user';

@Injectable()
export class TwitterService {

  private twit: Twit;

  constructor() {
    this.twit = new Twit({
      consumer_key: environment.twitter.consumer_key,
      consumer_secret: environment.twitter.consumer_secret,
      access_token: environment.twitter.access_token,
      access_token_secret: environment.twitter.access_token_secret
    });
  }

  async getFollowers(username: string): Promise<TwitterUser> {
    let followers: string[] = [];
    let cursor: number = -1;

    do {
      const data = await this.get('followers/list', { screen_name: username, cursor, count: 200 });
      followers = [ ...followers, ...data.users.map(x => x.screen_name) ];
      cursor = data.next_cursor;
    } while(cursor > 0);

    console.log("# followers of", username, followers.length)
    return { username, followers } as TwitterUser;
  }

  private get(url: string, data: any = null): Promise<any> {
    return new Promise((resolve, reject) => this.twit.get(url, data, (err, data) => err ? reject(err) : resolve(data)));
  }
}
