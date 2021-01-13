import { useAuth } from '../../context/AuthContext';
import { useState } from 'preact/hooks';

const initialState = {
  email: '',
  password: ''
}

const UnauthenticatedApp = () => {
  const { login } = useAuth();
  const [error, setError] = useState(false)
  const [credentials, setCredentials] = useState(false)

  const loginWithCredentials = async (e) => {
    e.preventDefault()
    const { data: { login: token } } = await login(credentials);
    if (!token) {
      setError(true);
      setCredentials(initialState);
    }
  }

  const handleForm = (e) => {
    setCredentials(prevState => ({ ...prevState, [e.target.name]: e.target.value }));
  }

  return (
    <>
      <h2>Unauthenticated App!</h2>
      <h3>Log in here</h3>
      <form onChange={handleForm} onSubmit={loginWithCredentials}>
        <input type='text' name='email' value={credentials.email} />
        <input type='password' name='password' value={credentials.password} />
        <button type='submit'>Log in!</button>
      </form>
      {error ? <p>Invalid login</p> : null}
    </>
  );
}

export default UnauthenticatedApp;
