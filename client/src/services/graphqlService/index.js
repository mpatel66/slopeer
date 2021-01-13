import { createClient } from '@urql/preact';
import queries from './queries';
import mutations from './mutations';

const client = createClient({
  url: 'http://localhost:4000/graphql',
  // url: 'https://fast-yak-4.loca.lt/graphql',
});


export { client, queries, mutations };
