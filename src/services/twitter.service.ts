import { Injectable } from '@nestjs/common';
import * as Twit from 'twit';
import { environment } from '../environment';

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

  async getFollowers(username: string): Promise<string[]> {
    const followers = await this.get('followers/list', { screen_name: username });
    return followers.map(x => x.screen_name);
  }

  private get(url: string, data: any = null): Promise<any> {
    return new Promise((resolve, reject) => this.twit.get(url, data, (err, data) => err ? reject(err) : resolve(data)));
  }
}
