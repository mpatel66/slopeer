import { gql } from '@urql/preact';

const mutations = {
  login: gql`
    mutation($email: String!, $password:String!) {
      login(email: $email, password:$password)
    }
  `
}
export default mutations;
