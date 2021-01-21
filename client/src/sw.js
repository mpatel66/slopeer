import { getFiles, setupPrecaching, setupRouting } from 'preact-cli/sw/';
import { registerRoute } from 'workbox-routing';
import { StaleWhileRevalidate, NetworkFirst } from 'workbox-strategies';
import { ExpirationPlugin } from 'workbox-expiration';

registerRoute(
  ({ request }) => request.destination === 'script' ||
    request.destination === 'style',
  new StaleWhileRevalidate()
);

registerRoute(
  ({ request }) => request.destination === 'image',
  new NetworkFirst({
    cacheName: 'images',
    plugins: [
      new ExpirationPlugin({
        maxEntries: 60,
        maxAgeSeconds: 30 * 24 * 60 * 60 // 30 Days
      })
    ]
  })
);

setupRouting();
setupPrecaching(getFiles());
