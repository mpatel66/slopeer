import { useState } from 'preact/hooks';

import { useAuth } from '../../context/AuthContext';
import NavButton from '../../components/navButton';

const initialCredentials = { email: '', password: '' };

const Login = () => {
  const { login } = useAuth();
  const [error, setError] = useState(false);
  const [credentials, setCredentials] = useState(initialCredentials);

  const loginWithCredentials = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      const success = await login(credentials);
      if (!success) {
        setError(true);
        setCredentials(initialCredentials);
      }
    }
  }

  const handleForm = (e) => {
    setCredentials(prevState => ({ ...prevState, [e.target.name]: e.target.value }));
  }

  const validateForm = () => credentials.email && credentials.password;

  return (
    <>
      <h3>Log in to Slopeer</h3>
      <form onChange={handleForm} onSubmit={loginWithCredentials}>
        <input type='text' name='email' value={credentials.email} placeholder='Enter your email' />
        <input type='password' name='password' value={credentials.password} placeholder='password' />
        <button type='submit' disabled={!validateForm()}>Log in!</button>
      </form>
      {error ? <p>Invalid email and/or password!</p> : null}
      <h3>OR</h3>
      <NavButton text={'REGISTER'} to={'/register'} />
    </>
  )
}
export default Login;
