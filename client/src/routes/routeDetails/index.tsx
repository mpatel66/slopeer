import { Fragment, h, FunctionComponent } from 'preact';
import { route, Link } from 'preact-router';
import { useQuery } from '@urql/preact';
import { useState } from 'preact/hooks';
import { queries, toggleSaveRoute } from '../../services/graphqlService';
import { useAuth } from '../../context/AuthContext';
import { gradeBckgColor, gradeColor } from '../../utils/routes';
import { Spinner, Content, Picture } from '../../components';
import { useNetwork } from '../../context/NetworkContext';
import IUser from '../../../types/User';
import IRoute, { IData, IMatches } from '../../../types/Route';

const style = require('/style.css');
declare function require(name: string): any;

const saveIcon = '/assets/images/save.svg';
const savedIcon = '/assets/images/saved.svg';
const editIcon = '/assets/images/edit.svg';

const RouteDetails: FunctionComponent<IMatches> = ({
  matches: { id: _id },
}) => {
  const { user } = useAuth();
  const { online } = useNetwork();
  const [saved, setSaved] = useState(false);

  const [{ data, fetching, error }] = useQuery<IData>({
    query: queries.routeDetailsQuery,
    variables: { _id },
  });

  const [
    { data: userRoutes, fetching: fetchingUser, error: userError },
    refreshUser,
  ] = useQuery<IData>({
    query: queries.userRoutesQuery,
    variables: { _id: user },
  });

  if (!userRoutes || !data) {
    console.log('No data here!');
    return null;
  }
  const handleToggleSave = async () => {
    const { error } = await toggleSaveRoute(saved, user, _id);
    if (!error) {
      refreshUser({ requestPolicy: 'network-only' });
    }
  };

  const showRouteInMap = (lat: IRoute['lat'], lng: IRoute['lng']) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(
        'mapLocation',
        JSON.stringify({ lng, lat, zoom: 20 })
      );
    }
    route('/map');
  };

  const renderRouteDetails = () => {
    if (error || userError || !userRoutes.user) {
      route('/');
      return <h1>error</h1>;
    }

    const {
      name,
      grade,
      picture,
      author: { username, _id: userId },
      type,
      description,
      lat,
      lng,
      _id,
    } = data.route;

    const owned =
      userRoutes.user.owned_routes.filter((route) => route._id === _id).length >
      0;
    setSaved(
      userRoutes.user.saved_routes.filter((route) => route._id === _id).length >
        0
    );

    return (
      <div class={style.routeDetails}>
        <div class={style.title}>
          <h1>{name}</h1>
          {online && (
            <>
              {owned ? (
                <img
                  src={editIcon}
                  alt='edit Icon'
                  class={style.icon}
                  onClick={() => route(`/editRoute/${_id}`)}
                />
              ) : (
                <img
                  src={saved ? savedIcon : saveIcon}
                  alt='saveIcon'
                  onClick={handleToggleSave}
                  class={style.icon}
                />
              )}
            </>
          )}
        </div>
        <Picture
          profile={false}
          picture={picture}
          type={type}
          routename={name}
          imageStyle={style.image}
        />
        <h3>
          Grade:{' '}
          <span
            style={{
              backgroundColor: gradeBckgColor(grade),
              color: gradeColor(grade),
            }}
            class={style.grade}
          >
            {grade}
          </span>
        </h3>
        <div class={style.routeInfo}>
          <h2>
            AUTHOR{' '}
            <Link href={`/profile/${userId}`} class={style.author}>
              {username}
            </Link>{' '}
          </h2>
          <h3>
            TYPE{' '}
            <span class={style.light}>
              {type[0].toUpperCase() + type.slice(1)}
            </span>
          </h3>
          {description ? (
            <>
              <h3 style={{ marginBottom: '0' }}>DESCRIPTION</h3>
              <p class={style.description}>{description}</p>
            </>
          ) : null}
        </div>
        <button class={style.show} onClick={() => showRouteInMap(lat, lng)}>
          Show in Map
        </button>
      </div>
    );
  };

  return (
    <Content addStyle={{ height: '100%', maxWidth: '60rem' }}>
      {fetching || fetchingUser ? <Spinner /> : renderRouteDetails()}
      <div class={style.helper}></div>
    </Content>
  );
};

export default RouteDetails;
