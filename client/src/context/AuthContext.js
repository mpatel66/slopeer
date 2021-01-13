import { useContext, useState } from 'preact/hooks';
import { createContext } from 'preact';
import JwtDecode from 'jwt-decode';

import * as authService from '../services/authService';

const AuthContext = createContext()
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZmZmMDFjNDUyZDA2M2QwM2RiN2Y1MmUiLCJpYXQiOjE2MTA1NTc5NTV9.Dh5RgFLDaAtEtwfcYXp0SSaP3j8zUV599fDw2Lu7ZTM';


function AuthProvider (props) {
  const [user, setUser] = useState(null)

  function checkUser () {
    const token = localStorage.getItem('accessToken');
    if (token) {
      try {
        const payload = JwtDecode(token);
        const { _id } = payload;
        setUser(_id ? _id : null);
      } catch {
        setUser(null);
      }
    } else setUser(null);
  }

  checkUser();

  const login = async (credentials) => {
    const res = await authService.login(credentials)
    const { data } = res;
    if (data.login) {
      localStorage.setItem('accessToken', data.login);
      checkUser();
    }
    return { data }
  }
  // const register = () => { } // register the user
  const logout = () => {
    localStorage.removeItem('accessToken');
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }} {...props} />
  )
}

const useAuth = () => useContext(AuthContext)

export { AuthProvider, useAuth }
