
import { h } from 'preact';
import { Router } from 'preact-router';

import Footer from '../footer';

// Code-splitting is automated for `routes` directory
import Map from '../../routes/map';
import Profile from '../../routes/profile';
import Redirect from '../redirect';
import MyRoutes from '../../routes/myRoutes';
import RouteDetails from '../../routes/routeDetails';
import AddRoute from '../../routes/addRoute';

const AuthenticatedApp = () => (
  <>
    <Router>
      <Map path="/" />
      <Profile path="/profile/:id" />
      <MyRoutes path="/myRoutes" />
      <RouteDetails path="/route/:id" />
      <AddRoute path="/addRoute" />
      <Redirect default to='/' />
    </Router>
    <Footer />
  </>
);

export default AuthenticatedApp;
