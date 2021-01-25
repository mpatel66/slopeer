import  mongoose from 'mongoose';
import app from '../../index';
import {default as request} from 'supertest';
import User  from '../../../models/user.model';

const dbName = 'testslopeer';
beforeAll( async () => {
  const url = `mongodb://localhost:27017/${dbName}`;
  await mongoose.connect(url, { useNewUrlParser: true });
}); 

const user = {
  email: 'test@test.com',
  username: 'testymctestface',
  password: 'superstrongpassword123'
};

async function gqlRequest (payload:any) {
  return await request(app)
    .post('/graphql')
    .send(payload)
    .set('Accept', 'application/json');
}

afterAll(async ()=> {
  await User.deleteMany(); // drop all the data from users.
  await mongoose.connection.close(); // close the db after the test finishes, otherwise jest will complain.
  console.log('clean up complete');
});

describe ('Register New User', () => {
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
    const response = await gqlRequest(payload);
    // expect http status to be 200 if successfully created.
    expect(response.status).toBe(200);

    // New user should be in the database.
    const findUser = await User.findOne({email:user.email});
    expect(findUser.username).toBe(user.username);
  });

  it('Should not create two users of the same email', async () => {
    const response = await gqlRequest(payload);
    // 2. user with same email cannot be created again. Expect 409 status code.
    expect(response.status).toBe(409);
  });

});

describe ('User Actions', () => {
  let userId = '';
  const loginMut =  `mutation($email: String!, $password:String!){
    login(email: $email, password: $password)
  }`;

  const LoginPayload = {
    'query': `${loginMut}`, 
    'variables': { 
      'email': `${user.email}`,
      'password': `${user.password}`,
    } 
  };

  it('Should log the user in', async () => {
    const response = await gqlRequest(LoginPayload);
    expect(response.status).toBe(200);
    // receive a JWT token. On client side, the token is used in the middleware to check for a valid user.
    userId = response.body.data.login;
  });

  //logs out correctly here.
  // console.log('userId outside', userId);

  const userMut = `mutation($_id:ID!, $username: String!, $profile_picture:FileUpload){
    updateUser(_id:$_id, input: {username: $username, profile_picture:$profile_picture}){
      _id
      username
    }
  }`;

  const userPayload = {
    'query': `${userMut}`,
    'variables': {
      '_id': `${userId}`,
      'username': 'BoatMcBoatFace'
    }
  };


  // get a cast error. Although below userId is defined, when the test runs, it uses an empty string.

  it('Should allow user to update profile', async () => {
    console.log('userid', userId);
    const response = await gqlRequest(userPayload);
    // console.log(response.body);
    expect(response.body.data.username).toBe('BoatMcBoatFace');
    // expect(response.status).toBe(200);
  });

});