import { profilePicturesUrl, routePicturesUrl } from '../../../config';
import { selectPlaceholder } from '../../utils/routes';

const Picture = ({ profile, picture, username, type, routename, pictureStyle }) => {
  const baseUrl = profile ? profilePicturesUrl : routePicturesUrl;
  let defaultUrl;
  let webpUrl;

  if (picture) {
    webpUrl = baseUrl + picture.split('.')[0] + '.webp'
    defaultUrl = baseUrl + picture;
  } else {
    defaultUrl = profile ? '/assets/images/avatar.svg' :
      selectPlaceholder(type);
  }

  return (
    <picture class={pictureStyle}>
      {
        picture ? <source type='image/webp' srcset={webpUrl} /> : null
      }
      <source srcset={defaultUrl} />
      {
        profile ? <img src={defaultUrl} alt={`${username} profile_picture`} style={{ height: '100%', width: '100%' }} /> :
          <img src={defaultUrl} alt={`${routename} picture`} style={{ height: '100%', width: '100%' }} />
      }
    </picture>
  )
}

export default Picture;
