import { route } from 'preact-router';

const NavButton = ({ text, to }) =>
  <button onClick={() => route(to)}>{text}</button>

export default NavButton
