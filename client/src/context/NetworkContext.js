import { useContext, useState } from 'preact/hooks';
import { createContext } from 'preact';

const NetworkContext = createContext();

function NetworkProvider (props) {
  const [online, setOnline] = useState(true);
  if (typeof window !== 'undefined') {
    setOnline(navigator.onLine);
    window.addEventListener('online', () => setOnline(true));
    window.addEventListener('offline', () => setOnline(false));
  }

  return <NetworkContext.Provider value={{ online }} {...props} />;
}

const useNetwork = () => useContext(NetworkContext);

export { NetworkProvider, useNetwork };
