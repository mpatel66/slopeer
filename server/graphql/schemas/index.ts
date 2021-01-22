import { gql } from 'apollo-server-express';
import mutationSchema from './mutation';
import querySchema from './query';
import typesSchema from './types';

const schema = gql`
  ${querySchema}
  ${mutationSchema}
  ${typesSchema}
`;

export default schema;
