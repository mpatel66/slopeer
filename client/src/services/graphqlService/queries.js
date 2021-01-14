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
        type
      }
      saved_routes {
        _id
        name
        grade
        picture
        type
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
  `,
  userDataQuery: gql`
  query($_id: ID!) {
    user(_id: $_id) {
    	username
      profile_picture
    	owned_routes {
        name
        public
        grade
    }
    }
  }
  `
}

export default queries;
