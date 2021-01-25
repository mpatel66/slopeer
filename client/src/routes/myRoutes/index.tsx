import { useQuery } from '@urql/preact';
import { useState } from 'preact/hooks';
import { LargeRouteCard, Spinner } from '../../components';
import { queries } from '../../services/graphqlService';
import { useAuth } from '../../context/AuthContext';
import { JSX } from 'preact/jsx-runtime';
import { IData } from '../../../types/Route';
import { h, FunctionComponent } from 'preact';

const style = require('./style.css');

declare function require(name: string): any;

type RouteType = 'owned_routes' | 'saved_routes';

const MyRoutes: FunctionComponent = (): JSX.Element => {
  const { user } = useAuth();

  const [{ data, fetching, error }, _] = useQuery<IData>({
    query: queries.userRoutesQuery,
    variables: { _id: user },
  });

  const [shownRoutes, setShownRoutes] = useState<RouteType>('owned_routes');

  const showRoutes = () => {
    if (data) {
      return data.user[shownRoutes].map((route) => (
        <LargeRouteCard {...route} key={route._id} />
      ));
    }
  };

  return (
    <>
      <header class={style.header}>
        <nav>
          <button
            onClick={() => setShownRoutes('owned_routes')}
            class={shownRoutes === 'owned_routes' ? style.selected : ''}
          >
            OWNED ROUTES
          </button>
          <button
            onClick={() => setShownRoutes('saved_routes')}
            class={shownRoutes === 'saved_routes' ? style.selected : ''}
          >
            SAVED ROUTES
          </button>
        </nav>
      </header>
      {fetching ? <Spinner /> : null}
      {error ? <h3>An error ocurred.</h3> : null}
      {data ? (
        <div class={style.routeList}>
          {!fetching && !error ? showRoutes() : null}
        </div>
      ) : null}
    </>
  );
};

export default MyRoutes;
