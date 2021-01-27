import { Fragment, h, FunctionComponent } from "preact";
import { useState, useEffect } from 'preact/hooks';
import { route } from 'preact-router';
import { useMutation } from '@urql/preact';
import { client, queries, mutations } from '../../services/graphqlService';
import { RouteForm } from '../../components';
import { useAuth } from '../../context/AuthContext'; 
import IRoute, {IData, IMatches} from '../../../types/Route'

const initialRoute: IRoute = {
  _id: '',
  name: '',
  grade: '',
  public: false,
  type: '',
  description: '',
  author: '', 
  picture: '', 
  lat: '', 
  lng: ''
}

interface routeProps {
  matches: {
    id:IRoute['_id'];
  }
}

const EditRoute:FunctionComponent<routeProps> = ({ matches: { id } }) => {
  console.log(id,'id')
  const { user } = useAuth();
  const [routeData, setRouteData] = useState<IRoute>(initialRoute);
  const [{ fetching: updatingRoute }, updateRoute] = useMutation(
    mutations.updateRoute
  );

  useEffect( () => {
    client.query(queries.routeDetailsQuery, { _id: id }).toPromise()
      .then(({data, error}): void => {
        if(error || data?.route?.author._id !== user) { 
          route('/');
        } else { 
          const route: IRoute = data.route;
          console.log(route, 'route')
          setRouteData({
            ...routeData,
            name: route.name,
            grade: route.grade,
            public: route.public,
            type: route.type,
            description: route.description
          });
        }
      })
  }, []);

 
  const handleSubmit = async (e:MouseEvent) => {
    e.preventDefault();
    if (routeData.name) {
      await updateRoute({...routeData, _id: id,});
      route(`/route/${id}`);
    }
  };

  return (
    <RouteForm
      title={'EDIT ROUTE'}
      showSpinner={updatingRoute}
      routeData={routeData}
      setRouteData={setRouteData}
      onSubmit={handleSubmit}
      hasCoords={false}
    />
  );
};

export default EditRoute;
