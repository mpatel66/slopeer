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

describe ('Register New User', () => {
  const user = {
    email: 'test@test.com',
    username: 'testymctestface',
    password: 'superstrongpassword123'
  };
  const mutation = `mutation($email: String!, $username:String!, $password:String!){
    createUser(input: {email: $email, username: $username, password: $password})
  }`;
  const payload = {
    'query': `${mutation}`, 
    'variables': { 
      'email': `${user.email}`,
      'username': `${user.username}`,
      'password': `${user.password}`,
    } 
  };

  // Create a new user
  it('Ceates a new user', async () => {
    // create a new user
    const response = await request(app)
      .post('/graphql')
      .send(payload)
      .set('Accept', 'application/json');

    // expect http status to be 200 if successfully created.
    expect(response.status).toBe(200);

    // New user should be in the database.
    const findUser = await User.findOne({email:user.email});
    expect(findUser.username).toBe(user.username);
  });

  it('Should not create two users of the same email', async () => {
    const response = await request(app)
      .post('/graphql')
      .send(payload)
      .set('Accept', 'application/json');
    // 2. user with same email cannot be created again. Expect 409 status code.
    expect(response.status).toBe(409);
  });

});