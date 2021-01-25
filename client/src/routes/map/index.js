import { useRef, useState, useEffect } from 'preact/hooks';
import { useQuery } from '@urql/preact';
import mapboxgl from 'mapbox-gl';

import { mapboxToken, mapboxStyle } from '../../../config';
import { RouteMarker, RoutePreview, Content } from '../../components';
import { queries } from '../../services/graphqlService';
import style from './style.css';

mapboxgl.accessToken = mapboxToken;
// mapboxgl.workerClass = require('worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker').default;

const Map = () => {
  let savedLocation;
  if (typeof window !== 'undefined') {
    savedLocation = localStorage.getItem('mapLocation');
  }
  const initialMapState = savedLocation
    ? JSON.parse(savedLocation)
    : { lng: 2, lat: 42, zoom: 8 };

  const mapContainerRef = useRef(null);
  const [mapState, setMapState] = useState(initialMapState);
  const [map, setMap] = useState(null);
  const [routePreview, setRoutePreview] = useState(null);

  const [{ data }, _] = useQuery({ query: queries.publicRoutesQuery });

  // Setup Map on component mount
  useEffect(() => {
    const newMap = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: mapboxStyle,
      center: [mapState.lng, mapState.lat],
      zoom: mapState.zoom
    });

    newMap.addControl(
      new mapboxgl.GeolocateControl({
        positionOptions: { enableHighAccuracy: true },
        trackUserLocation: true
      })
    );

    newMap.on('move', () => {
      const currentCords = {
        lng: newMap.getCenter().lng.toFixed(4),
        lat: newMap.getCenter().lat.toFixed(4),
        zoom: newMap.getZoom().toFixed(2)
      };
      setMapState(currentCords);
      setRoutePreview(null);
      if (typeof window !== 'undefined') {
        localStorage.setItem('mapLocation', JSON.stringify(currentCords));
      }
    });

    setMap(newMap);
  }, []);

  // Add Route Markers when loaded
  useEffect(() => {
    if (map && data) {
      data.routes.forEach((route) => {
        const el = RouteMarker(route.grade);
        el.className = style.marker;
        el.addEventListener('click', () => setRoutePreview(route._id));
        new mapboxgl.Marker(el).setLngLat([route.lng, route.lat]).addTo(map);
      });
    }
  }, [data, map]);

  return (
    <>
      {routePreview
        ? (
          <Content>
            <RoutePreview _id={routePreview} />
          </Content>
        )
        : null}
      <div>
        <div class={style.sideBarStyle}></div>
        <div class={style.mapContainer} ref={mapContainerRef} />
      </div>
    </>
  );
};

export default Map;
