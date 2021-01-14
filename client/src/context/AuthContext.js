import { useContext, useState } from 'preact/hooks';
import { createContext } from 'preact';
import JwtDecode from 'jwt-decode';

import * as authService from '../services/authService';

const AuthContext = createContext()
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZmZmMDFjNDUyZDA2M2QwM2RiN2Y1MmUiLCJpYXQiOjE2MTA1NTc5NTV9.Dh5RgFLDaAtEtwfcYXp0SSaP3j8zUV599fDw2Lu7ZTM';


function AuthProvider (props) {
  const [user, setUser] = useState(null)

  const loginWithToken = (token) => {
    try {
      const payload = JwtDecode(token);
      setUser(payload._id ? payload._id : null);
      localStorage.setItem('accessToken', token);
    } catch {
      setUser(null);
    }
  }

  function checkUser () {
    const token = localStorage.getItem('accessToken');
    token ? loginWithToken(token) : setUser(null);
  }

  checkUser();


  const login = async (credentials) => {
    const { data: { login: token } } = await authService.login(credentials)
    if (token) loginWithToken(token);
    return token ? true : false;

  }

  const register = async (data) => {
    const { data: { createUser: token } } = await authService.register(data)
    if (token) loginWithToken(token);
    return token ? true : false;
  }

  const logout = () => {
    localStorage.removeItem('accessToken');
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, register, login, logout }} {...props} />
  )
}

const useAuth = () => useContext(AuthContext)

export { AuthProvider, useAuth }
