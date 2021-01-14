import { route } from 'preact-router';
import { useQuery } from '@urql/preact';
import { useState } from 'preact/hooks';
import { queries, toggleSaveRoute } from '../../services/graphqlService';
import { useAuth } from '../../context/AuthContext';
import { gradeBckgColor, gradeColor, routePicture } from '../../utils/routes'

import style from './style.css'
import Spinner from '../spinner';
import Content from '../content';

const saveIcon = '/assets/images/save.svg';
const savedIcon = '/assets/images/saved.svg';

const RouteDetails = ({ matches: { id: _id } }) => {

  const { user } = useAuth()
  const [saved, setSaved] = useState(false);

  const [{ data, fetching }, _] = useQuery({
    query: queries.routeDetailsQuery,
    variables: { _id },
  });

  const [{ data: userRoutes, fetching: fetchingUser }, __] = useQuery({
    query: queries.userRoutesQuery,
    variables: { _id: user },
  });

  const handleToggleSave = async () => {
    await toggleSaveRoute(saved, user, _id);
  }

  const showRouteInMap = (lat, lng) => {
    localStorage.setItem('mapLocation', JSON.stringify({ lng, lat, zoom: 20 }));
    route('/');
  }

  const renderRouteDetails = () => {

    const { name, grade, picture, author: { username }, type, description, lat, lng, _id } = data.route

    const owned = userRoutes.user.owned_routes.filter(route => route._id === _id).length > 0;
    setSaved(userRoutes.user.saved_routes.filter(route => route._id === _id).length > 0);

    return (
      <div class={style.routeDetails}>
        <div class={style.title}>
          <h1>{name}</h1>
          {
            owned ? null :
              <img
                src={saved ? savedIcon : saveIcon}
                alt="saveIcon"
                onClick={handleToggleSave}
                class={style.save}
              />
          }
        </div>
        <center>
          <img src={routePicture(picture, type)} alt={name} class={style.picture} />
          <h3
            class={style.grade}
            style={{
              backgroundColor: gradeBckgColor(grade),
              color: gradeColor(grade)
            }}
          >
            Grade: {grade}
          </h3>
        </center>
        <div class={style.routeInfo}>
          <h2>AUTHOR <span class={style.light}>{username}</span></h2>
          <h3>TYPE <span class={style.light}>{type[0].toUpperCase() + type.slice(1)}</span></h3>
          {
            description ?
              <>
                <h3 style={{ marginBottom: '0' }}>DESCRIPTION</h3>
                <p class={style.description}>{description}</p>
              </>
              : null
          }
        </div>
        <center>
          <button class={style.show} onClick={() => showRouteInMap(lat, lng)}>Show in Map</button>
        </center>
      </div>
    )
  }

  return (
    <Content addStyle={{ height: '100%' }}>
      {
        fetching || fetchingUser ? <Spinner /> : renderRouteDetails()
      }
    </Content>
  );
}

export default RouteDetails
