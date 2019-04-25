import { environment } from '../environment';
import { v1 } from 'neo4j-driver';

console.log(environment.neo4j);
export const neo4jProvider = {
  provide: 'Neo4jProvider',
  useFactory: () => v1.driver(
    environment.neo4j.host,
    v1.auth.basic(environment.neo4j.user, environment.neo4j.password),
    { encrypted: true }
  )
};
