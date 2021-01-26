import  mongoose from 'mongoose';
import app from '../../index';
import {default as request} from 'supertest';
import User  from '../../../models/user.model';
import mutations from './test_client/clientMutations';

const dbName = 'testslopeer';
beforeAll( async () => {
  const url = `mongodb://localhost:27017/${dbName}`;
  await mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
}); 

const user = {
  email: 'test@test.com',
  username: 'testymctestface',
  password: 'superstrongpassword123',
  _id: ''
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
  const payload = {
    'query': `${mutations.register}`, 
    'variables': { 
      'email': `${user.email}`,
      'username': `${user.username}`,
      'password': `${user.password}`,
    } 
  };
  // Create a new user
  it('Ceates a new user', async () => {
    const response = await gqlRequest(payload); // expect http status to be 200 if successfully created.
    expect(response.status).toBe(200);
    // New user should be in the database.
    const findUser = await User.findOne({email:user.email});
    expect(findUser.username).toBe(user.username);
    user._id = findUser._id;
  });

  it ('Should encrypt the password', async () => {
    const getUser = await User.findById(user._id);
    expect(getUser.password).not.toBe(user.password);
  });

  it('Should not create two users of the same email', async () => {
    const response = await gqlRequest(payload);
    // 2. user with same email cannot be created again. Expect 409 status code.
    expect(response.status).toBe(409);
  });

});

describe ('User Login & Update Profile', () => {

  it('Should log the user in', async () => {
    const LoginPayload = {
      'query': `${mutations.login}`, 
      'variables': { 
        'email': `${user.email}`,
        'password': `${user.password}`,
      } 
    };
    const response = await gqlRequest(LoginPayload);
    expect(response.status).toBe(200);
  });

  it('Should allow user to update profile', async () => {
    const userPayload = {
      'query': `${mutations.updateUser}`,
      'variables': {
        '_id': `${user._id}`,
        'username': 'BoatMcBoatFace'
      }
    };
    const response = await gqlRequest(userPayload);
    expect(response.body.data.updateUser.username).toBe('BoatMcBoatFace');
    expect(response.status).toBe(200);
  });

});
