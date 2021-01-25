import { FormCard, Upload } from '..';
import { grades } from '../../utils/routes';
const style = require('./style');

const RouteForm = ({
  title,
  showSpinner,
  routeData,
  setRouteData,
  onSubmit,
  validate,
  hasCoords,
  coords,
  setCurrentLoc,
  setMapLoc
}) => {
  const handleChange = (e) => {
    const { target } = e;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    if (name === 'picture') {
      if (target.validity.valid && target.files) {
        setRouteData((prevData) => ({
          ...prevData,
          picture: target.files[0]
        }));
      }
    } else {
      setRouteData((prevData) => ({
        ...prevData,
        [name]: value
      }));
    }
  };

  return (
    <FormCard showSpinner={showSpinner}>
      <center>
        <h1>{title}</h1>
      </center>
      <form onChange={handleChange} class={style.addForm} onSubmit={onSubmit}>
        <h2> Name </h2>
        <input
          type="text"
          name="name"
          value={routeData.name}
          placeholder="Name"
          onInput={() => console.log('hello')}
        />
        <div></div>
        <div class={style.public}>
          <h2>Public</h2>
          <input
            type="checkbox"
            id="public"
            name="public"
            checked={routeData.public}
          />
        </div>
        {hasCoords
          ? (
            <div class={style.coords}>
              <h2 class={style.coordsTitle}>Coordinates</h2>
              <div class={style.coord}>
                <h3>Latitude</h3>
                <input type="text" name="lat" value={routeData.lat} readonly />
              </div>
              <div class={style.coord}>
                <h3>Longitude</h3>
                <input type="text" name="lng" value={routeData.lng} readonly />
              </div>
              <div class={style.buttonWrap}>
                <button
                  onClick={setCurrentLoc}
                  class={
                    coords === 'current' ? style.activeButton : style.ghostButton
                  }
                >
                Current
                </button>

                <button
                  onClick={setMapLoc}
                  class={
                    coords === 'map' ? style.activeButton : style.ghostButton
                  }
                >
                Map
                </button>
              </div>
            </div>
          )
          : null}
        <div class={style.type}>
          <h2>Type</h2>
          <select name="type" value={routeData.type}>
            <option value="sport">Sport</option>
            <option value="boulder">Boulder</option>
            <option value="multi-pitch">Multi-Pitch</option>
            <option value="psicobloc">Psicobloc</option>
          </select>
        </div>
        <div class={style.grade}>
          <h2>Grade</h2>
          <select name="grade" value={routeData.grade}>
            {grades.map((grade) => (
              <option value={grade}>{grade}</option>
            ))}
          </select>
        </div>
        <h2>Description</h2>
        <textarea
          name="description"
          value={routeData.description}
          class={style.description}
        />
        <Upload name={'picture'} />
        <button type="submit" class={style.activeButton}>
          Submit
        </button>
      </form>
    </FormCard>
  );
};

export default RouteForm;
