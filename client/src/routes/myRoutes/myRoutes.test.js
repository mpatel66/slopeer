import '@testing-library/jest-dom';
import { render } from '@testing-library/preact';
import { AuthProvider } from '../../context/AuthContext';

import MyRoutes from './index.tsx';
import { h } from 'preact';
jest.mock('mapbox-gl', () => ({
  GeolocateControl: jest.fn(),
  Map: jest.fn(() => ({
    addControl: jest.fn(),
    on: jest.fn(),
    remove: jest.fn()
  })),
  NavigationControl: jest.fn()
}));

// jest.mock('worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker', () => {});
describe('myroutes', () => {
  beforeEach(() => {
    window.URL.createObjectURL = () => {};
  });
  test('should display initial routes', () => {
    console.log('window', window.URL.createObjectURL);

    const { container } = render(
      <AuthProvider>
        <MyRoutes />
      </AuthProvider>
    );
    expect(container.textContent).toMatch('1');
  });
});
