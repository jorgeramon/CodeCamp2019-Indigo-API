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
}
