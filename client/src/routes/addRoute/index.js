import { useState, useEffect } from 'preact/hooks';
import { route } from 'preact-router';
import { useMutation } from '@urql/preact';

import { useAuth } from '../../context/AuthContext';
import { mutations } from '../../services/graphqlService';
import { RouteForm } from '../../components/';

const getPosition = () =>
  new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject, {
      enableHighAccuracy: true
    });
  });

const parseCoords = (lat, lng) => ({
  lat: Number(lat).toFixed(4),
  lng: Number(lng).toFixed(4)
});

const AddRoute = () => {
  const initialData = {
    name: '',
    public: true,
    type: 'sport',
    grade: '1',
    description: '',
    lat: '',
    lng: '',
    author: useAuth().user
  };
  const [{ fetching: creatingRoute }, createRoute] = useMutation(
    mutations.createRoute
  );
  const [routeData, setRouteData] = useState(initialData);
  const [coords, setCoords] = useState('current');

  const setCurrentLoc = async (e) => {
    if (e) e.preventDefault();
    if (typeof window !== 'undefined' && 'navigator' in window) {
      const {
        coords: { latitude, longitude }
      } = await getPosition();

      setRouteData((prevData) => ({
        ...prevData,
        ...parseCoords(latitude, longitude)
      }));
    }
    setCoords('current');
  };

  const setMapLoc = (e) => {
    e.preventDefault();
    let mapLoc;
    if (typeof window !== 'undefined') {
      localStorage.getItem('mapLocation');
    }
    if (mapLoc) {
      const { lat, lng } = JSON.parse(mapLoc);
      setRouteData((prevData) => ({
        ...prevData,
        ...parseCoords(lat, lng)
      }));
      setCoords('map');
    }
  };

  useEffect(async () => {
    await setCurrentLoc();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (routeData.name) {
      const variables = { ...routeData };
      const response = await createRoute(variables);
      console.log(response);
      route(`route/${response.data.createRoute._id}`);
    }
  };

  return (
    <RouteForm
      title={'ADD A NEW ROUTE'}
      showSpinner={creatingRoute}
      routeData={routeData}
      setRouteData={setRouteData}
      onSubmit={handleSubmit}
      hasCoords={true}
      coords={coords}
      setCurrentLoc={setCurrentLoc}
      setMapLoc={setMapLoc}
    />
  );
};

export default AddRoute;
