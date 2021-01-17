import { useState, useEffect } from 'preact/hooks';
import { route } from 'preact-router'
import { useMutation } from '@urql/preact';

import { client, queries, mutations } from "../../services/graphqlService";
import { RouteForm } from '../../components';
import { useAuth } from '../../context/AuthContext';

const EditRoute = ({ matches: { id } }) => {
  const { user } = useAuth()
  const [routeData, setRouteData] = useState({})
  const [{ fetching: updatingRoute }, updateRoute] = useMutation(mutations.updateRoute);

  useEffect(async () => {

    const { data, error } = await client.query(queries.routeDetailsQuery, { _id: id }).toPromise();

    // If there was an error (i.e. invalid url -> /editRoute/invalidRouteId)
    // Or if the current user is not the owner of the route, redirect to '/'
    if (error || data.route.author._id !== user) {
      route('/');
      return;
    }

    const {
      name,
      grade,
      public: isPublic,
      type,
      description,
    } = data.route

    setRouteData({
      name,
      grade,
      public: isPublic,
      type,
      description,
    })
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log('routeData', routeData);
    await updateRoute({ _id: id, ...routeData });
    route(`/route/${id}`);
  }

  return <RouteForm
    title={'EDIT ROUTE'}
    showSpinner={updatingRoute}
    routeData={routeData}
    setRouteData={setRouteData}
    onSubmit={handleSubmit}
    hasCoords={false}
  />
}

export default EditRoute;
