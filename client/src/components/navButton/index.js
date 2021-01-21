import { route } from 'preact-router';

const NavButton = ({ text, to, ...rest }) =>
  <button onClick={() => route(to)} {...rest} >{text}</button>;

export default NavButton;
