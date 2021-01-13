import { h } from 'preact';
import { useAuth } from '../../context/AuthContext';
import style from './style.css';

const Home = () => {
  const { logout } = useAuth()

  return (
    <div class={style.home}>
      <h1>Home</h1>
      <p>This is the Home component.</p>
      <button type="submit" onClick={logout}> Log out</button>
    </div>
  );
}

export default Home;
