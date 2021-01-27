import { Fragment, h } from 'preact'
import { route } from 'preact-router';
import IRoute from '../../../types/Route'
import {FunctionComponent, JSX,  } from "preact"
import { Picture } from '..';
import { gradeColor, gradeBckgColor } from '../../utils/routes';
const style = require('./style.css');
declare function require(name: string): any;


const LargeRouteCard:FunctionComponent <IRoute> = ({ picture, name, grade, _id, type }) => {

  return (
    <div class={style.split} onClick={() => route(`route/${_id}`)}
    title='largeRouteCard'>
    <Picture 
      profile={false}
      picture={picture}
      type={type}
      routename={name}
      pictureStyle={style.picture}
      imageStyle={style.image}
    />

    <div class={style.routeData}>
      <h2 class={style.routeName}>{name}</h2>
      <div class={style.details}>
        <h3 class={style.routeType}>{type[0].toUpperCase() + type.slice(1)}</h3>
        <h3
          class={style.routeGrade}
          style={{
            backgroundColor: gradeBckgColor(grade),
            color: gradeColor(grade)
          }}
        >
          {grade}</h3>
      </div>
    </div>
  </div> 
  )
  
}
export default LargeRouteCard;
