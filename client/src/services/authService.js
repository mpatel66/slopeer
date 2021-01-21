import { client, mutations } from './graphqlService';

const login = async (credentials) => {
  return await client.mutation(mutations.login, credentials)
    .toPromise();
};

const register = async (userData) => {
  return await client.mutation(mutations.register, userData)
    .toPromise();
};

export { login, register };
