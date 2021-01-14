import { gql } from '@urql/preact';

const mutations = {
  login: gql`
    mutation($email: String!, $password:String!) {
      login(email: $email, password:$password)
    }
  `,
  register: gql`
  mutation($email: String!, $username:String!, $password:String!) {
    createUser(email: $email, username: $username, password: $password)
  }
  `
}
export default mutations;
