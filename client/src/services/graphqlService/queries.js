import { gql } from '@urql/preact';

const queries = {
  publicRoutesQuery: gql`
  query{
    routes(public: true) {
      _id
      grade
      lat
      lng
    }
  }
`,
  userRoutesQuery: gql`
  query ($_id: ID!) {
    user(_id: $_id) {
      owned_routes {
        _id
        name
        grade
        picture
      }
      saved_routes {
        _id
        name
        grade
        picture
      }
    }
  }
  `,
  routeDetailsQuery: gql`
    query ($_id: ID!) {
      routes(_id: $_id) {
        _id
        name
        grade
        picture
        owner {
          _id
          username
        }
        type
        notes
        lat
        lng
    }
    }
  `
}

export default queries;
