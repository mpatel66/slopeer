import { gql } from '@urql/preact';

const mutations = {
  login: gql`
    mutation($email: String!, $password:String!) {
      login(email: $email, password:$password)
    }`
  ,
  register: gql`
  mutation($email: String!, $username:String!, $password:String!) {
    createUser(input: {email: $email, username: $username, password: $password})
  }`
  ,
  saveRoute: gql`
    mutation($userId: ID!, $routeId: ID!) {
      saveRoute(userId: $userId, routeId: $routeId) {
        saved_routes {
          _id
        }
      }
    }`
  ,
  unsaveRoute: gql`
    mutation($userId: ID!, $routeId: ID!) {
      unsaveRoute(userId: $userId, routeId: $routeId) {
        saved_routes {
          _id
        }
      }
    }`
  ,
}
export default mutations;
