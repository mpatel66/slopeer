
import { h } from 'preact';
import { Router } from 'preact-router';

import Footer from '../footer';

// Code-splitting is automated for `routes` directory
import Map from '../../routes/map';
import Profile from '../../routes/profile';
import Redirect from '../redirect';

const AuthenticatedApp = () => (
  <>
    <Router>
      <Map path="/" />
      <Profile path="/profile/" user="me" />
      <Profile path="/profile/:user" />
      <Redirect default to='/' />
    </Router>
    <Footer />
  </>
);

export default AuthenticatedApp;
