import { AuthenticatedApp, UnauthenticatedApp, OfflineWarning } from './';
import { useAuth } from '../context/AuthContext';
import { useNetwork } from '../context/NetworkContext';

const App = () => {
  const { user } = useAuth();
  const { online } = useNetwork();

  return (
    <div id="app">
      {online ? <span /> : <OfflineWarning />}
      {user ? <AuthenticatedApp /> : <UnauthenticatedApp />}
    </div>
  )
}

export default App;
