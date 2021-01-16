import { createClient, dedupExchange, cacheExchange } from '@urql/preact';
import { multipartFetchExchange } from '@urql/exchange-multipart-fetch';

import { serverUrl } from '../../../config';
import queries from './queries';
import mutations from './mutations';

const client = createClient({
  url: `${serverUrl}/graphql`,
  exchanges: [
    dedupExchange,
    cacheExchange,
    multipartFetchExchange,
  ],
});

const toggleSaveRoute = async (saved, userId, routeId) => {
  const mutation = saved ? mutations.unsaveRoute : mutations.saveRoute;
  return await client.mutation(mutation, { userId, routeId }).toPromise();
}


export { client, queries, mutations, toggleSaveRoute };
