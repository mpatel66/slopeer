import { useState } from 'preact/hooks';

import { useAuth } from '../../context/AuthContext';
import NavButton from '../../components/navButton';

const initialUserData = {
  email: '',
  username: '',
  password: ''
}

const Register = () => {
  const { register } = useAuth();
  const [error, setError] = useState(false);
  const [userData, setUserData] = useState(initialUserData);

  const registerUser = async (e) => {
    if (validateForm()) {

      e.preventDefault();
      const { data: { login: token } } = await register(userData);
      if (!token) {
        setError(true);
        setUserData(prevData => ({ ...prevData, email: '', password: '' }));
      }
    }
  }


  const handleForm = (e) => {
    setUserData(prevData => ({ ...prevData, [e.target.name]: e.target.value }));
  }

  const validateForm = () => userData.email && userData.username && userData.password

  return (
    <>
      <h3>Register to Slopeer</h3>
      <form onChange={handleForm} onSubmit={registerUser}>
        <input type='text' name='email' value={userData.email} placeholder='Email' />
        <input type='text' name='username' value={userData.username} placeholder='Username' />
        <input type='password' name='password' value={userData.password} placeholder='Password' />
        <button type='submit' disabled={validateForm()}>Register</button>
      </form>
      {error ? <p>Email already registered!</p> : null}
      <h3>OR</h3>
      <NavButton text={'LOGIN'} to={'/login'} />
    </>
  )
}


export default Register;
