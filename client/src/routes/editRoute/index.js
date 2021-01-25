// import { Fragment, h, FunctionComponent } from "preact";
import { useState, useEffect } from 'preact/hooks';
import { route } from 'preact-router';
import { useMutation } from '@urql/preact';
import { client, queries, mutations } from '../../services/graphqlService';
import { RouteForm } from '../../components';
import { useAuth } from '../../context/AuthContext';

const EditRoute = ({ matches: { id } }) => {
  const { user } = useAuth();
  const [routeData, setRouteData] = useState({});
  const [{ fetching: updatingRoute }, updateRoute] = useMutation(
    mutations.updateRoute
  );

  useEffect(async () => {
    const {
      data: { route },
      error
    } = await client.query(queries.routeDetailsQuery, { _id: id }).toPromise();

    if (error || route.author._id !== user) {
      route('/');
      return;
    }

    setRouteData({
      name: route.name,
      grade: route.grade,
      public: route.public,
      type: route.type,
      description: route.description
    });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (routeData.name) {
      await updateRoute({ _id: id, ...routeData });
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
