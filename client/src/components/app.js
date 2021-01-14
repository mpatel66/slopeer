import { h } from 'preact';
import AuthenticatedApp from './authenticatedApp';
import UnauthenticatedApp from './unauthenticadedApp';
import { useAuth } from '../context/AuthContext';

const App = () => {
  const { user } = useAuth();
  return (
    <div id="app">
      {user ? <AuthenticatedApp /> : <UnauthenticatedApp />}
    </div>
  )
}

export default App;
