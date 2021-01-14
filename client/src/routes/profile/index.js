import { useQuery } from '@urql/preact';
import { queries } from '../../services/graphqlService';
import Spinner from '../../components/spinner';
import { useAuth } from "../../context/AuthContext";
import Content from '../../components/content';
import SmallRouteCard from '../../components/smallRouteCard';
import style from './style.css';

const defaultPicture = 'assets/images/avatar.svg'

const Profile = () => {
  const { user, logout } = useAuth();
  const [{ data, fetching, error }, _] = useQuery({
    query: queries.userDataQuery,
    variables: { _id: user },
  });

  const renderUserData = ({ username, profile_picture, owned_routes }) => {
    profile_picture = profile_picture ? profile_picture : defaultPicture;
    const routes = owned_routes.filter(route => route.public);
    return (
      <div class={style.userData}>
        <h1>{username}</h1>
        <img src={profile_picture} alt={`${username} profile picture`} class={style.avatar} />
        <button onClick={logout} class={style.logout}>LOGOUT</button>
        <h2>Public Routes</h2>
        {routes.map(route => <SmallRouteCard data={route} />)}
      </div>
    )
  }


  return (
    <Content>
      {fetching ? <Spinner /> : null}
      {error || (data && !data.user) ? <h1>We are sorry. An error ocurred.</h1> : null}
      {data && data.user ? renderUserData(data.user) : null}
    </Content>
  )
}

export default Profile;
