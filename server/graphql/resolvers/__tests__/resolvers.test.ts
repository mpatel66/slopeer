import  mongoose from 'mongoose';
import app from '../../index';
import {default as request} from 'supertest';
import User  from '../../../models/user.model';
import mutations from './test_client/clientMutations';
import Route from '../../../models/route.model';
import testRoutes from './test_client/routes';

const dbName = process.env.DB_NAME;
const DB = process.env.DB;
const user = {
  email: 'test@test.com',
  username: 'testymctestface',
  password: 'superstrongpassword123',
  _id: ''
};

const fakeDetails = {
  email: 'jesus@god.com',
  username: 'SonOfGod',
  password: 'judas123',
};

async function gqlRequest (payload:any) {
  return await request(app)
    .post('/graphql')
    .send(payload)
    .set('Accept', 'application/json');
}

beforeAll( async () => {
  const url = `${DB}/${dbName}`;
  await mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });

  const testUser = await User.create(fakeDetails);
  const id: string = testUser._id;
  const newRoutes = testRoutes.map(route => {
    return {
      ...route,
      author: id
    };
  });
  await Route.insertMany(newRoutes);

}); 

afterAll(async ()=> {
  await User.deleteMany(); // drop all the data from users.
  await Route.deleteMany(); // drop all the data from users.
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

describe('User Saved Routes', () => {
  
  async function toggleRoute (route:string, save:boolean) {
    const savePayload = {
      'query': `${save ? mutations.saveRoute : mutations.unsaveRoute}`,
      'variables': {
        'userId': `${user._id}`,
        'routeId': `${route}`
      }
    };
    return await gqlRequest(savePayload);
  }
  
  it('Should allow users to save routes', async () => {
    const existingRoutes = await Route.find();

    const firstRoute = await toggleRoute(existingRoutes[0]._id, true);
    expect(firstRoute.status).toBe(200);
    expect(firstRoute.body.data.saveRoute.saved_routes.length).toBe(1);

    const secondRoute = await toggleRoute(existingRoutes[1]._id,true);
    expect(secondRoute.body.data.saveRoute.saved_routes.length).toBe(2);

    const thirdRoute = await toggleRoute(existingRoutes[2]._id,true);
    expect(thirdRoute.body.data.saveRoute.saved_routes.length).toBe(3);
  });

  it('Should allow users to remove saved routes', async () => {
    const existingRoutes = await Route.find();

    const removeFirst = await toggleRoute(existingRoutes[0]._id, false);
    expect(removeFirst.body.data.unsaveRoute.saved_routes.length).toBe(2);

    const removeSecond = await toggleRoute(existingRoutes[1]._id, false);
    expect(removeSecond.body.data.unsaveRoute.saved_routes.length).toBe(1);

    const removeThird = await toggleRoute(existingRoutes[2]._id, false);
    expect(removeThird.body.data.unsaveRoute.saved_routes.length).toBe(0);
  });

  
});
