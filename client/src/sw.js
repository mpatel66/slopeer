import { getFiles, setupPrecaching, setupRouting } from 'preact-cli/sw/';
import { registerRoute } from 'workbox-routing';
import { StaleWhileRevalidate } from 'workbox-strategies';

registerRoute(
  ({ request }) => request.destination === 'script' ||
    request.destination === 'style',
  new StaleWhileRevalidate()
);

setupRouting();
setupPrecaching(getFiles());

