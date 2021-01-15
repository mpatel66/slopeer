import { Link } from 'preact-router/match';
import style from './style.css';

import NavButton from '../navButton';
import Content from '../content';
import { useAuth } from '../../context/AuthContext';

const Footer = () => {
  const { user } = useAuth()
  return (
    <footer class={style.footer}>
      <Content>
        <nav>
          <Link activeClassName={style.active} href='/'>Map</Link>
          <NavButton text={'+'} to='/addRoute' class={style.addRoute} />
          <Link activeClassName={style.active} href='/myRoutes'>My Routes</Link>
          <Link activeClassName={style.active} href={`/profile/${user}`}>Profile</Link>
        </nav>
      </Content>
    </footer>
  )
}

export default Footer;
