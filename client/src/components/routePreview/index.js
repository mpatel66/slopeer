import { useQuery } from '@urql/preact';
import { route } from 'preact-router'

import { queries } from '../../services/graphqlService';
import { routePicture } from '../../utils/routes';
import Spinner from '../spinner';
import style from './style.css'

const RoutePreview = ({ _id, closePreview }) => {
  const [{ data, fetching }, _] = useQuery({
    query: queries.routeDetailsQuery,
    variables: { _id },
  });

  if (fetching) return <Spinner />

  const { picture, name, type } = data.route;

  return (
    <div class={style.preview} onClick={() => route(`route/${_id}`)}>
      <div class={style.picture} style={{ backgroundImage: `url(${routePicture(picture, type)}` }}></div>
      <div>
        <h3>{name}</h3>
        <h4 class={style.type}>{type[0].toUpperCase() + type.slice(1)}</h4>
      </div>
      <button class={style.close} onClick={closePreview}>&#10005;</button>
    </div>
  )


}

export default RoutePreview
