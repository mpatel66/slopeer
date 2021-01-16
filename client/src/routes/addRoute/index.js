import { useState, useRef, useEffect } from 'preact/hooks';
import { route } from 'preact-router'
import { useMutation } from '@urql/preact';

import Content from '../../components/content';
import Spinner from '../../components/spinner';
import { useAuth } from '../../context/AuthContext';
import { grades } from '../../utils/routes';
import style from './style.css';
import { mutations } from '../../services/graphqlService';
import FormCard from '../../components/formCard';

const getPosition = () =>
  new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject, { enableHighAccuracy: true });
  });

const AddRoute = () => {

  const { user } = useAuth();
  const file = useRef();
  const [{ fetching: creatingRoute }, createRoute] = useMutation(mutations.createRoute);

  const initialData = {
    name: '',
    public: true,
    type: 'sport',
    grade: '1',
    description: '',
    lat: '',
    lng: '',
    picture: file,
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

    if (name !== 'filename') {
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
      const variables = { ...routeData, picture: null }
      const response = await createRoute(variables)
      if (!response.error) {
        route(`route/${response.data.createRoute._id}`);
      }
    }
  }

  return (
    <FormCard showSpinner={creatingRoute}>
      <center>
        <h1>Add a new route</h1>
      </center>
      <form onChange={handleChange} class={style.addForm} onSubmit={handleSubmit}>
        <h3> Route name</h3>
        <input type='text' name='name' value={routeData.name} />
        <h3>Public</h3>
        <input type='checkbox' id='public' name='public' checked={routeData.public}>
          <label for='public'>Public</label>
        </input>
        <h3>Coordinates</h3>
        <div>
          <input type='text' name='lat' value={routeData.lat} readonly />
          <input type='text' name='lng' value={routeData.lng} readonly />
        </div>
        <div class={style.buttonWrap}>
          <button
            onClick={setCurrentLoc}
            class={coords === 'current' ? style.activeButton : style.ghostButton}
          >
            Use current coords
          </button>
          <button
            onClick={setMapLoc}
            class={coords === 'map' ? style.activeButton : style.ghostButton}
          >
            Use map coords
          </button>
        </div>
        <h3>Type</h3>
        <select name='type' value={routeData.type}>
          <option value='sport'>Sport</option>
          <option value='boulder'>Boulder</option>
          <option value='multi-pitch'>Multi-Pitch</option>
          <option value='psicobloc'>Psicobloc</option>
        </select>
        <h3>Grade</h3>
        <select name='grade' value={routeData.grade}>
          {grades.map(grade => <option value={grade}>{grade}</option>)}
        </select>
        <h3>Description</h3>
        <textarea name='description' value={routeData.description} />
        <h3>Picture</h3>
        <input
          type='file'
          name='filename'
          accept='.png, .jpg'
          ref={file}
        />
        <button type='submit' class={style.activeButton}>Submit</button>
      </form>
    </FormCard>

  )
}

export default AddRoute
