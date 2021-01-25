import { profilePicturesUrl, routePicturesUrl } from '../../../config';
import { selectPlaceholder } from '../../utils/routes';
import IRoute, {IPicture} from '../../../types/Route'
// import User from '../../../types/User'
import { h, FunctionComponent } from "preact";


const Picture:FunctionComponent<IPicture> = ({ profile, picture, username, type, routename, pictureStyle, imageStyle }) => {

  const baseUrl = profile ? profilePicturesUrl : routePicturesUrl;
  let defaultUrl;
  let webpUrl;

  if (picture) {
    webpUrl = baseUrl + picture.split('.')[0] + '.webp';
    defaultUrl = baseUrl + picture;
  } else {
    defaultUrl = profile
      ? '/assets/images/avatar.svg'
      : selectPlaceholder(type);
  }

  return (
    <picture class={pictureStyle} >
      {
        picture ? <source type='image/webp' srcset={webpUrl} /> : null
      }
      <source srcset={defaultUrl} />
      {
        profile && username
          ? <img src={defaultUrl} alt={`${username} profile_picture`} class={imageStyle} />
          : <img src={defaultUrl} alt={`${routename} picture`} class={imageStyle} />
      }
    </picture>
  );
};

export default Picture;
