import { useContext, useState } from 'preact/hooks';
import { createContext } from 'preact';
import JwtDecode from 'jwt-decode';

import * as authService from '../services/authService';

const AuthContext = createContext()

function AuthProvider (props) {
  const [user, setUser] = useState(null)

  const loginWithToken = (token) => {
    try {
      const { _id, exp } = JwtDecode(token);
      if (Date.now() > exp * 1000) throw new Error()
      if (typeof window !== 'undefined') {
        localStorage.setItem('accessToken', token);
      }
      setUser(_id);
    } catch {
      setUser(null);
    }
  }

  function checkUser () {
    let token;
    if (typeof window !== 'undefined') {
      token = localStorage.getItem('accessToken');
    }
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
    if (typeof window !== 'undefined') {
      localStorage.removeItem('accessToken');
    }
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, register, login, logout }} {...props} />
  )
}

const useAuth = () => useContext(AuthContext)

export { AuthProvider, useAuth }
