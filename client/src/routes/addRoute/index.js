import { useState, useRef, useEffect } from 'preact/hooks';
import { route } from 'preact-router'
import { useMutation } from '@urql/preact';


import { useAuth } from '../../context/AuthContext';
import { grades } from '../../utils/routes';
import style from './style.css';
import { mutations } from '../../services/graphqlService';
import { FormCard, Upload } from '../../components/';

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
  const [ready, setReady] = useState(false);

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

  const handleChange = (e) => {
    const { target } = e;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    if (name === 'picture') {
      if (target.validity.valid && target.files) {
        setRouteData(prevData => ({
          ...prevData,
          picture: target.files[0]
        }));
      }
    } else {
      setRouteData(prevData => ({
        ...prevData,
        [name]: value
      }));
    }

    setReady(routeData.name.length > 0)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (ready) {
      const variables = { ...routeData }
      const response = await createRoute(variables)
      if (!response.error) {
        route(`route/${response.data.createRoute._id}`);
      }
    }
  }

  return (
    <FormCard showSpinner={creatingRoute}>
      <center>
        <h1>ADD A NEW ROUTE</h1>
      </center>
      <form onChange={handleChange} class={style.addForm} onSubmit={handleSubmit}>
        <h2> Name </h2>
        <input type='text' name='name' value={routeData.name} placeholder='Name' />
        <div>

        </div>
        <div class={style.public}>
          <h2>Public</h2>
          <input type='checkbox' id='public' name='public' checked={routeData.public} />
        </div>
        <div class={style.coords} >
          <h2 class={style.coordsTitle}>Coordinates</h2>
          <div class={style.coord}>
            <h3>Latitude</h3>
            <input type='text' name='lat' value={routeData.lat} readonly />
          </div>
          <div class={style.coord}>
            <h3>Longitude</h3>
            <input type='text' name='lng' value={routeData.lng} readonly />
          </div>
          <div class={style.buttonWrap}>

            <button
              onClick={setCurrentLoc}
              class={coords === 'current' ? style.activeButton : style.ghostButton}
            >
              Current
          </button>

            <button
              onClick={setMapLoc}
              class={coords === 'map' ? style.activeButton : style.ghostButton}
            >
              Map
          </button>
          </div>
        </div>
        <div class={style.type}>
          <h2>Type</h2>
          <select name='type' value={routeData.type}>
            <option value='sport'>Sport</option>
            <option value='boulder'>Boulder</option>
            <option value='multi-pitch'>Multi-Pitch</option>
            <option value='psicobloc'>Psicobloc</option>
          </select>
        </div>
        <div class={style.grade}>
          <h2>Grade</h2>
          <select name='grade' value={routeData.grade}>
            {grades.map(grade => <option value={grade}>{grade}</option>)}
          </select>
        </div>
        <h2>Description</h2>
        <textarea
          name='description'
          value={routeData.description}
          class={style.description}
        />
        <div class={style.picture}>
          <h2>Picture</h2>
          <Upload name={'picture'} />
        </div>
        <button type='submit' class={style.activeButton}>Submit</button>
      </form>
    </FormCard>

  )
}

export default AddRoute
