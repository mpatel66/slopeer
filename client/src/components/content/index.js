import style from './style.css';

const Content = ({ children, addStyle }) => {
  return (
    <div class={style.content} style={{ ...addStyle }}>
      {children}
    </div>
  );
};

export default Content;
