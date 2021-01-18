import { useQuery } from '@urql/preact';
import { route } from 'preact-router';

import { profilePicturesUrl } from '../../../config'
import { queries } from '../../services/graphqlService';
import { Spinner, Content, SmallRouteCard, Picture } from '../../components';
import { useAuth } from "../../context/AuthContext";
import style from './style.css';

const defaultPicture = '/assets/images/avatar.svg'

const Profile = ({ matches: { id } }) => {
  const { user, logout } = useAuth();
  const [{ data, fetching, error }, _] = useQuery({
    query: queries.userDataQuery,
    variables: { _id: id },
  });

  const renderUserData = ({ username, profile_picture, owned_routes }) => {
    profile_picture = profile_picture ? profilePicturesUrl + profile_picture : defaultPicture;
    const routes = owned_routes.filter(route => route.public);
    return (
      <div class={style.userData}>
        <h1>{username}</h1>
        <Picture
          profile={true}
          picture={profile_picture}
          username={username}
          pictureStyle={style.avatar}
          imgStyle={{ height: '100%', width: '100%' }}
        />
        <img src={profile_picture} alt={`${username} profile picture`} class={style.avatar} />
        {user === id ?
          <div class={style.personal}>
            <button onClick={logout} class={style.logout}>LOGOUT</button>
            <img
              src='/assets/images/edit.svg'
              alt='edit'
              class={style.edit}
              onClick={() => route('/editProfile')}
            />
          </div >
          : null
        }
        <h2>Public Routes</h2>
        {routes.map(route => <SmallRouteCard data={route} />)}
      </div>
    )
  }

  return (
    <Content>
      {fetching ? <Spinner /> : null}
      {error || (data && !data.user) ? logout() : null}
      {data && data.user ? renderUserData(data.user) : null}
    </Content>
  )
}

export default Profile;
