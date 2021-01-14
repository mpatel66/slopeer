
import { h } from 'preact';
import { Router } from 'preact-router';

import Footer from '../footer';

// Code-splitting is automated for `routes` directory
import Home from '../../routes/home';
import Profile from '../../routes/profile';
import Redirect from '../redirect';

const AuthenticatedApp = () => (
  <>
    <Router>
      <Home path="/" />
      <Profile path="/profile/" user="me" />
      <Profile path="/profile/:user" />
      <Redirect default to='/' />
    </Router>
    <Footer />
  </>
);

export default AuthenticatedApp;
