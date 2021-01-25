import { Link } from 'preact-router/match';

import { NavButton, Content } from '..';
import { useAuth } from '../../context/AuthContext';
import { useNetwork } from '../../context/NetworkContext';
const style = require('/style.css');

const Footer = () => {
  const { user } = useAuth();
  const { online } = useNetwork();
  return (
    <footer class={style.footer}>
      <Content>
        <nav>
          <Link activeClassName={style.active} href='/map'>
            Map3
          </Link>
          {online && (
            <NavButton text={'+'} to='/addRoute' class={style.addRoute} />
          )}
          <Link activeClassName={style.active} href='/'>
            My Routes
          </Link>
          <Link activeClassName={style.active} href={`/profile/${user}`}>
            Profile
          </Link>
        </nav>
      </Content>
    </footer>
  );
};

export default Footer;
