import { createClient } from '@urql/preact';
import queries from './queries';
import mutations from './mutations';

const client = createClient({
  url: 'http://localhost:4000/graphql',
  // url: 'https://lazy-bullfrog-85.loca.lt/graphql',
});

const toggleSaveRoute = async (saved, userId, routeId) => {
  const mutation = saved ? mutations.unsaveRoute : mutations.saveRoute;
  return await client.mutation(mutation, { userId, routeId }).toPromise();
}


export { client, queries, mutations, toggleSaveRoute };
