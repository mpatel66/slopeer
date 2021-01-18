import { Link } from 'preact-router/match';
import style from './style.css';

import { NavButton, Content } from '../'
import { useAuth } from '../../context/AuthContext';

const Footer = () => {
  const { user } = useAuth()
  return (
    <footer class={style.footer}>
      <Content>
        <nav>
          <Link activeClassName={style.active} href='/map'>Map</Link>
          <NavButton text={'+'} to='/addRoute' class={style.addRoute} />
          <Link activeClassName={style.active} href='/'>My Routes</Link>
          <Link activeClassName={style.active} href={`/profile/${user}`}>Profile</Link>
        </nav>
      </Content>
    </footer>
  )
}

export default Footer;
