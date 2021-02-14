import * as dotenv from 'dotenv';
dotenv.config({ path: __dirname+'/.env' });
import app from './graphql';
import { connection  } from './models';

connection() //Connect to MongoDB, then fire up the server
  .then(() => {
    app
      .listen(4000, () => {
        console.log('🚀  Server ready at http://localhost:4000/graphql');
      });
  })
  .catch(console.error);
