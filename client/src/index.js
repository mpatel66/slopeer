import './style';
import App from './components/app';
import { AuthProvider } from './context/AuthContext';

export default () =>
  <AuthProvider>
    <App />
  </AuthProvider>
