import { useState, useEffect } from 'preact/hooks';
import { route } from 'preact-router'
import { useMutation } from '@urql/preact';


import { useAuth } from '../../context/AuthContext';
import { mutations } from '../../services/graphqlService';
import { RouteForm } from '../../components/';

const getPosition = () =>
  new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject, { enableHighAccuracy: true });
  });

const AddRoute = () => {

  const { user } = useAuth();
  const [{ fetching: creatingRoute }, createRoute] = useMutation(mutations.createRoute);

  const initialData = {
    name: '',
    public: true,
    type: 'sport',
    grade: '1',
    description: '',
    lat: '',
    lng: '',
    author: user
  }

  const [routeData, setRouteData] = useState(initialData);
  const [coords, setCoords] = useState('current');

  const setCurrentLoc = async (e) => {
    if (e) e.preventDefault();
    const { coords: { latitude, longitude } } = await getPosition();
    setRouteData(prevData => ({
      ...prevData,
      lat: Number(latitude).toFixed(4),
      lng: Number(longitude).toFixed(4)
    }));
    setCoords('current')
  }

  const setMapLoc = (e) => {
    e.preventDefault()
    const mapLoc = localStorage.getItem('mapLocation');
    if (mapLoc) {
      const { lat, lng } = JSON.parse(mapLoc);
      setRouteData(prevData => ({
        ...prevData,
        lat: Number(lat).toFixed(4),
        lng: Number(lng).toFixed(4)
      }));
      setCoords('map');
    }
  }

  useEffect(async () => {
    if ('navigator' in window) await setCurrentLoc();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault()
    const variables = { ...routeData }
    const response = await createRoute(variables)
    if (!response.error) {
      route(`route/${response.data.createRoute._id}`);
    }
  }

  return <RouteForm
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

}

export default AddRoute
