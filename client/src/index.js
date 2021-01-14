import { Provider } from '@urql/preact';
import { client } from './services/graphqlService';
import './style';
import App from './components/app';
import { AuthProvider } from './context/AuthContext';

export default () =>
  <Provider value={client}>
    <AuthProvider>
      <App />
    </AuthProvider>
  </Provider>
