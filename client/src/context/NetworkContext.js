import { useContext, useState } from 'preact/hooks';
import { createContext } from 'preact';

const NetworkContext = createContext()

function NetworkProvider (props) {
  console.log('navigator.onLine', navigator.onLine);
  const [online, setOnline] = useState(true);

  window.addEventListener('online', () => setOnline(true));
  window.addEventListener('offline', () => setOnline(false));

  return <NetworkContext.Provider value={{ online }} {...props} />
}

const useNetwork = () => useContext(NetworkContext);

export { NetworkProvider, useNetwork }
