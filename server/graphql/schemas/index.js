const { gql } = require('apollo-server-express');

module.exports = gql`
  ${require('./query.gql')}
  ${require('./mutation.gql')}
  ${require('./types.gql')}
`;
