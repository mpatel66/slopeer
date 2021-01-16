import { useMutation } from '@urql/preact';
import { useRef, useState, useEffect } from 'preact/hooks';
import { route } from 'preact-router';

import { mutations, client, queries } from '../../services/graphqlService';
import { Spinner, Content } from '../../components';
import { useAuth } from "../../context/AuthContext";
import style from './style.css'

const EditProfile = () => {

  const file = useRef();
  const { user } = useAuth();
  const [userData, setUserData] = useState({})

  useEffect(async () => {
    const currentData = await client.query(queries.userDataQuery, { _id: user }).toPromise();
    const { username } = currentData.data.user
    setUserData({ username })
  }, []);


  const [{ fetching: updatingProfile }, updateProfile] = useMutation(mutations.updateUser);

  const handleChange = (e) => {
    if (e.target.name === 'profile_picture') {
      if (e.target.validity.valid && e.target.files) {
        setUserData(prevData => ({
          ...prevData,
          profile_picture: e.target.files[0]
        }));
      }
    } else {
      setUserData(prevData => ({
        ...prevData,
        [e.target.name]: e.target.value
      }));
    }
  }

  const updateUser = async (e) => {
    const { username, profile_picture } = userData;
    const res = await updateProfile({ _id: user, username, profile_picture });
    route(`/profile/${user}`)
  }

  if (updatingProfile) return <Spinner />;

  return (
    <Content>
      <form onSubmit={updateUser} onChange={handleChange}>
        <h2>Username</h2>
        <input type='text' name='username' value={userData.username} />
        <h3>Profile picture</h3>
        <input
          type='file'
          name='profile_picture'
          accept='.png, .jpg'
          ref={file}
        />
        <button type='submit'>Submit</button>
      </form>
    </Content>
  )


}

export default EditProfile;
