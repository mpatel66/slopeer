
import { h } from 'preact';
import { Router } from 'preact-router';

import Header from '../header';

// Code-splitting is automated for `routes` directory
import Home from '../../routes/home';
import Profile from '../../routes/profile';
import Redirect from '../redirect';

const AuthenticatedApp = () => (
  <>
    <Header />
    <Router>
      <Home path="/" />
      <Profile path="/profile/" user="me" />
      <Profile path="/profile/:user" />
      <Redirect default to='/' />
    </Router>
  </>
);

export default AuthenticatedApp;
