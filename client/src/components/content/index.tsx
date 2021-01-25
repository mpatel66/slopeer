import { Fragment, h, FunctionComponent, JSX } from "preact";

const style = require('./style');

export interface Props {
  children?: JSX.Element[];
  addStyle?: h.JSX.AllCSSProperties;
}

const Content: FunctionComponent<Props> = ({ children, addStyle }) => {
  return (
    <div class={style.content} style={{ ...addStyle }}>
      {children}
    </div>
  );
};

export default Content;
