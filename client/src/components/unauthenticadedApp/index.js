import { Router } from 'preact-router';

import Login from '../../routes/login';
import Register from '../../routes/register';
import { Redirect } from '../';

const UnauthenticatedApp = () =>
  <Router>
    <Login path='/login' />
    <Register path='/register' />
    <Redirect default to='/login' />
  </Router>

export default UnauthenticatedApp;
