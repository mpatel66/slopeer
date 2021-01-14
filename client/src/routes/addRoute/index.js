import { useState, useRef, useEffect } from 'preact/hooks';

import Content from '../../components/content';
import { useAuth } from "../../context/AuthContext";
import { grades } from '../../utils/routes';
import style from './style.css';

const getPosition = () =>
  new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject, { enableHighAccuracy: true });
  });

const AddRoute = () => {

  const { user } = useAuth();
  const file = useRef();
  const initialData = {
    name: '',
    type: 'sport',
    grade: '1',
    description: '',
    lat: '',
    lng: '',
    file,
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

  const handleChange = (e) => {
    setRouteData(prevData => ({
      ...prevData,
      [e.target.name]: e.target.value
    }))
  }

  const handleSubmit = () => {

  }

  return (
    <Content>
      <h1>Add a new route</h1>
      <form onChange={handleChange} class={style.addForm} onSubmit={handleSubmit}>
        <h3>Name</h3>
        <input type='text' name='name' value={routeData.name} />
        <h3>Coordinates</h3>
        <div>
          <input type='text' name='lat' value={routeData.lat} readonly />
          <input type='text' name='lng' value={routeData.lng} readonly />
        </div>
        <div>
          <button onClick={setCurrentLoc}>Use current coords</button>
          <button onClick={setMapLoc}>Use map coords</button>
        </div>
        <h3>Type</h3>
        <select name='type' value={routeData.type}>
          <option value="sport">Sport</option>
          <option value="boulder">Boulder</option>
          <option value="multi-pitch">Multi-Pitch</option>
          <option value="psicobloc">Psicobloc</option>
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
        <button type='submit'>Submit</button>
      </form>
    </Content>
  )
}

export default AddRoute
