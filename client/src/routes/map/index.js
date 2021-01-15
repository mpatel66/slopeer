import { useRef, useState, useEffect } from 'preact/hooks';
import { useQuery } from '@urql/preact';
import mapboxgl from 'mapbox-gl';

import { queries } from '../../services/graphqlService';
import style from './style.css';

mapboxgl.accessToken =
  'pk.eyJ1IjoiZG9uZ3VpbGxhdW1lIiwiYSI6ImNram9saHN0bDBhb2Yyc281ZWk0Nmo3ajgifQ.q67m_193eBeK-Jti0fQ0TQ';
mapboxgl.workerClass = require('worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker').default;

const Map = () => {

  const savedLocation = localStorage.getItem('mapLocation');
  let initialMapState = savedLocation ? JSON.parse(savedLocation) : { lng: 2, lat: 42, zoom: 8 };

  const mapContainerRef = useRef(null);
  const [mapState, setMapState] = useState(initialMapState);
  const [map, setMap] = useState(null);

  const [{ data }, _] = useQuery({ query: queries.publicRoutesQuery });

  // Setup Map on component mount
  useEffect(() => {
    const newMap = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/donguillaume/ckjond67s028k19pjfaaxwrkw',
      center: [mapState.lng, mapState.lat],
      zoom: mapState.zoom
    })

    newMap.addControl(new mapboxgl.GeolocateControl({
      positionOptions: { enableHighAccuracy: true },
      trackUserLocation: true
    }));

    newMap.on('move', () => {
      const currentCords = {
        lng: newMap.getCenter().lng.toFixed(4),
        lat: newMap.getCenter().lat.toFixed(4),
        zoom: newMap.getZoom().toFixed(2)
      }
      setMapState(currentCords);
      localStorage.setItem('mapLocation', JSON.stringify(currentCords));
    });

    setMap(newMap)
  }, []);

  //Add Route Markers when loaded
  useEffect(() => {
    if (map && data) {
      data.routes.forEach(route => {
        // let el = RouteMarker(route);
        // el.className = style.marker;
        // el.activeClassName = style.markerActive
        new mapboxgl.Marker()
          .setLngLat([route.lng, route.lat])
          .addTo(map);
      })
    }
  }
    , [data, map])

  return (
    <div>
      <div class={style.sideBarStyle}>
      </div>
      <div class={style.mapContainer} ref={mapContainerRef} />
    </div>
  );
}

export default Map;
