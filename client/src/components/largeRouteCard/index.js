import { route } from 'preact-router';

import { routePicture, gradeColor, gradeBckgColor } from '../../utils/routes';
import style from './style';

const LargeRouteCard = ({ data: { picture, name, grade, _id, type } }) =>
  <div class={style.split} onClick={() => route(`route/${_id}`)}>
    <div class={style.picture} style={{ backgroundImage: `url(${routePicture(picture, type)}` }}></div>
    <div class={style.routeData}>
      <h2 class={style.routeName}>{name}</h2>
      <h3 class={style.routeType}>{type[0].toUpperCase() + type.slice(1)}</h3>
      <h3
        class={style.routeGrade}
        style={{
          backgroundColor: gradeBckgColor(grade),
          color: gradeColor(grade)
        }}
      >
        Grade: {grade}</h3>
    </div>
  </div>


export default LargeRouteCard
