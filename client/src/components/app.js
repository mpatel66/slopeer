import { useEffect, useState } from 'preact/hooks';

import { AuthenticatedApp, UnauthenticatedApp, OfflineWarning } from './';
import { useAuth } from '../context/AuthContext';

const App = () => {
  const { user } = useAuth();
  const [isOffline, setIsOffline] = useState(false);

  useEffect(() => {
    function handleNetworkChange () {
      if (navigator.onLine) {
        setIsOffline(false);
        window.location.reload();
      } else {
        setIsOffline(true);
      }
    }

    window.addEventListener("online", handleNetworkChange);
    window.addEventListener("offline", handleNetworkChange);
  }, [])

  return (
    <div id="app">
      {isOffline ? <OfflineWarning /> : <span />}
      {user ? <AuthenticatedApp /> : <UnauthenticatedApp />}
    </div>
  )
}

export default App;
