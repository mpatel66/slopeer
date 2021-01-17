import { useState, useEffect } from 'preact/hooks';
import { route } from 'preact-router'
import { useMutation } from '@urql/preact';

import { client, queries, mutations } from "../../services/graphqlService";
import { routePicture, grades } from '../../utils/routes';
import { Spinner, Content, RouteForm } from '../../components';
import style from './style.css';

const EditRoute = ({ matches: { id } }) => {

  const [routeData, setRouteData] = useState({})
  const [{ fetching: updatingRoute }, updateRoute] = useMutation(mutations.updateRoute);

  useEffect(async () => {
    const currentData = await client.query(queries.routeDetailsQuery, { _id: id }).toPromise();
    const {
      name,
      grade,
      public: isPublic,
      type,
      description,
    } = currentData.data.route

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

  // <Content>
  //   {
  //     updatingRoute ? <Spinner /> :
  //       <>
  //         <center>
  //           <h1>Edit Route</h1>
  //         </center>
  //         <form onChange={handleChange} class={style.addForm} onSubmit={handleSubmit}>
  //           <h3> Route name</h3>
  //           <input type='text' name='name' value={routeData.name} />
  //           <h3>Public</h3>
  //           <input type='checkbox' id='public' name='public' checked={routeData.public}>
  //             <label for='public'>Public</label>
  //           </input>
  //           <h3>Type</h3>
  //           <select name='type' value={routeData.type}>
  //             <option value='sport'>Sport</option>
  //             <option value='boulder'>Boulder</option>
  //             <option value='multi-pitch'>Multi-Pitch</option>
  //             <option value='psicobloc'>Psicobloc</option>
  //           </select>
  //           <h3>Grade</h3>
  //           <select name='grade' value={routeData.grade}>
  //             {grades.map(grade => <option value={grade}>{grade}</option>)}
  //           </select>
  //           <h3>Description</h3>
  //           <textarea name='description' value={routeData.description} />
  //           <h3>Picture</h3>
  //           <input
  //             type='file'
  //             name='picture'
  //             accept='.png, .jpg'
  //           />
  //           <button type='submit' class={style.activeButton}>Submit</button>
  //         </form>
  //       </>
  //   }
  // </Content>
}

export default EditRoute;
