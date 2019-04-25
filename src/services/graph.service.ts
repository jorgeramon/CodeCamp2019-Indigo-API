import { Injectable, Inject } from '@nestjs/common';

import { TwitterUser } from '../interfaces/twitter-user';

@Injectable()
export class GraphService {

  constructor(@Inject('Neo4jProvider') private readonly neo4j) {}

  findUsers(users: string[]): Promise<any> {
    const query = `
      MATCH (n:User)
      WHERE n.username IN {users} AND n.analyzed = true
      RETURN n.username
    `;

    return this.run(query, { users });
  }

  findCommonFollowers(usernameA: string, usernameB: string): Promise<any> {
    const query = `
      MATCH (n:User { username: {usernameA} })-[:FOLLOWS]->(m)<-[:FOLLOWS]-(n2: User { username: {usernameB} })
      RETURN m
    `;

    return this.run(query, { usernameA, usernameB });
  }

  createUser(username: string): Promise<any> {
    const query = `
      MERGE (n:User { username: {username} })
        ON CREATE SET n.analyzed = true
        ON MATCH SET n.analyzed = true
      RETURN n
    `;

    return this.run(query, { username });
  }

  createFollower(username: string, follower:string): Promise<any> {
    const query = `
      MATCH (n1:User { username: {username} })
      MERGE (n2:User { username: {follower} })
        ON CREATE SET n2.analyzed = false
      MERGE (n1)-[:FOLLOWS]->(n2)
      RETURN n1.username, n2.username
    `;

    return this.run(query, { username, follower });
  }

  async findFollowers(username: string) {
    const query = `
      MATCH (:User { username: {username} })-[:FOLLOWS]->(follower)
      RETURN follower.username
    `;

    const result = await this.run(query);
    return result;
  }

  private async run(query: string, params: any = {}): Promise<any> {
    const session = this.neo4j.session();

    try {
      const result = await session.run(query, params);
      session.close();
      //console.log("Result query", result);

      return result.records;
    } catch (e) {
      session.close();
      console.log("Error query Neo4j", e);

      throw e;
    }
  }
}
