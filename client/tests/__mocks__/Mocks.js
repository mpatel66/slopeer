export const MapMock = {
  'mapbox-gl': () => ({
    GeolocateControl: jest.fn(),
    Map: jest.fn(() => ({
      addControl: jest.fn(),
      on: jest.fn(),
      remove: jest.fn()
    })),
    NavigationControl: jest.fn()
  })};
 

  
  const mockClient = {
    executeQuery: jest.fn(() => never),
    executeMutation: jest.fn(() => never),
    executeSubscription: jest.fn(() => never),
  };