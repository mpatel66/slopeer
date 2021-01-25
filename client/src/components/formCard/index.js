import { Spinner } from '../';
import style from './style.css';

const FormCard = ({ children, showSpinner }) => (
  <div class={style.bcg}>
    {showSpinner
      ? (
        <Spinner />
      )
      : (
        <>
          <div class={style.card}>{children}</div>
          <div class={style.helper} />
        </>
      )}
  </div>
);

export default FormCard;
