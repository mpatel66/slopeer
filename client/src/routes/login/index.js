import { useState } from 'preact/hooks';

import { useAuth } from '../../context/AuthContext';
import NavButton from '../../components/navButton';
import Content from '../../components/content';
import style from './style.css';

const initialCredentials = { email: '', password: '' };

const Login = () => {
  const { login } = useAuth();
  const [error, setError] = useState(false);
  const [credentials, setCredentials] = useState(initialCredentials);

  const loginWithCredentials = async (e) => {
    e.preventDefault();
    if (credentials.email && credentials.password) {
      const success = await login(credentials);
      if (!success) {
        setError(true);
        setCredentials(initialCredentials);
      }
    }
  }

  const handleForm = (e) => {
    setError(false);
    setCredentials(prevState => ({ ...prevState, [e.target.name]: e.target.value }));
  }

  return (
    <div class={style.main}>
      <Content addStyle={{ height: '100%' }}>
        <div class={style.login}>
          <h1>SLOPEER</h1>
          <center>
            <img src='assets/icons/android-chrome-192x192.png' alt='slopeer icon' class={style.icon} />
          </center>
          <form onChange={handleForm} onSubmit={loginWithCredentials} class={style.loginForm}>
            <input type='text' name='email' value={credentials.email} placeholder='Email' />
            <input type='password' name='password' value={credentials.password} placeholder='Password' />
            {
              error ? <p class={style.error}>Invalid email and/or password!</p> :
                <button type='submit'>Log in</button>
            }
          </form>
          <center>
            <h3>— OR —</h3>
            <NavButton text={'Register'} to={'/register'} class={style.register} />
          </center>
        </div>
      </Content >
    </div>
  )
}
export default Login;
