import  mongoose from 'mongoose';
import app from '../../index';
import {default as request} from 'supertest';
import User  from '../../../models/user.model';

const dbName = 'testslopeer';
beforeAll( async () => {
  const url = `mongodb://localhost:27017/${dbName}`;
  await mongoose.connect(url, { useNewUrlParser: true });
}); 

afterAll(async ()=> {
  await User.deleteMany(); // drop all the data from users.
  await mongoose.connection.close(); // close the db after the test finishes, otherwise jest will complain.
  console.log('clean up complete');
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
  const input = {
    email: 'test@test.com',
    username: 'testymctestface',
    password: 'superstrongpassword123'
  };
  const mutation = `mutation($email: String!, $username:String!, $password:String!){
    createUser(input: {email: $email, username: $username, password: $password})
  }`;

  it('Gets a user from the database', async () => {
    const response = await request(app).get(`/graphql?query=${query}`);
    expect(response.body.data.user.username).toBe(username);
  });

  it('Ceate a new user', async () => {
    // const response = await request(app).get(`/graphql?query=${mutation}`);
    const response = await await request(app).post('/graphql').send(
      {
        'query': `${mutation}`, 
        'variables': { 
          'email': `${input.email}`,
          'username': `${input.username}`,
          'password': `${input.password}`,
        } 
      }
    ).set('Accept', 'application/json');
    console.log('user created', response.status);
    expect(response.status).toBe(200);
  });

});
