import { createClient, dedupExchange, cacheExchange } from '@urql/preact';
import { multipartFetchExchange } from '@urql/exchange-multipart-fetch';
import { offlineExchange } from '@urql/exchange-graphcache';
import { makeDefaultStorage } from '@urql/exchange-graphcache/default-storage';

import schema from '../../schema.json';
import { serverUrl } from '../../../config';
import queries from './queries';
import mutations from './mutations';

let cache;
if (typeof window !== 'undefined') {
  const storage = makeDefaultStorage({
    idbName: 'graphcache-v3', // The name of the IndexedDB database
    maxAge: 7 // The maximum age of the persisted data in days
  });
  cache = offlineExchange({ schema, storage });
} else {
  cache = cacheExchange;
}

const client = createClient({
  url: `${serverUrl}/graphql`,
  exchanges: [
    dedupExchange,
    cache,
    multipartFetchExchange
  ]
});

const toggleSaveRoute = async (saved, userId, routeId) => {
  const mutation = saved ? mutations.unsaveRoute : mutations.saveRoute;
  return await client.mutation(mutation, { userId, routeId }).toPromise();
};

export { client, queries, mutations, toggleSaveRoute };
