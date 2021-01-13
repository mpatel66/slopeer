import { h } from 'preact';
import { Router } from 'preact-router';

import Header from './header';

// Code-splitting is automated for `routes` directory
import Home from '../routes/home';
import Profile from '../routes/profile';
import AuthenticatedApp from './authenticatedApp';
import UnauthenticatedApp from './unauthenticadedApp';

const App = () => {
  const user = false;//auth.getCurrentUser()
  return (
    <div id="app">
      {user ? <AuthenticatedApp /> : <UnauthenticatedApp />}
    </div>
  )
}

export default App;
