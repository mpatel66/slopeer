import { route } from 'preact-router';
import { gradeBckgColor, gradeColor } from '../../utils/routes';
import style from './style.css';

const SmallRouteCard = ({ data: { name, grade, _id } }) =>
  <div class={style.smallCard} onClick={() => route(`/route/${_id}`)} >
    <h3 class={style.name}>{name}</h3>
    <div
      style={
        {
          backgroundColor: gradeBckgColor(grade),
          color: gradeColor(grade)
        }}
      class={style.grade}
    >
      <h3>{grade}</h3>
    </div>
  </div >;

export default SmallRouteCard;
