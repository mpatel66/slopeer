import  mongoose from 'mongoose';
import app from '../../index';
// import * as request from "supertest";
import {default as request} from 'supertest';
// const request = supertest(app);
// import { gql } from 'apollo-server-express';

const dbName = 'testslopeer';
beforeAll( async () => {
  const url = `mongodb://localhost:27017/${dbName}`;
  await mongoose.connect(url, { useNewUrlParser: true });
}); 

afterAll(done => {
  // Closing the DB connection allows Jest to exit successfully.
  mongoose.connection.close();
  done();
});


//Test to check that jest is working.
describe ('my first test', () => {
  const userId = '5fff037ddb8f2fd31c7f2168';
  const username = 'Some Body';
  const query = `query{
    user(_id:"${userId}") {
      _id
      username
      profile_picture
    }
  }`;
  // console.log('query', query);

  it('Gets a user from the database', async () => {
    const response = await request(app).get(`/graphql?query=${query}`);
    expect(response.body.data.user.username).toBe(username);
  });
});
