import { client, mutations, queries } from './graphqlService';

const login = async ({ email, password }) => {
  console.log('email', email);
  console.log('password', password);
  return await client.mutation(mutations.login, { email, password })
    .toPromise();
}

export { login }
