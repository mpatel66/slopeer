import "@testing-library/jest-dom";
import Profile from './';
import { AuthProvider } from "../../context/AuthContext";
import { render } from "@testing-library/preact";
import { h } from "preact";
import { NetworkProvider } from '../../context/NetworkContext';
import { Provider } from '@urql/preact';
import { fromValue, never } from 'wonka';

jest.mock("mapbox-gl", () => ({
  GeolocateControl: jest.fn(),
  Map: jest.fn(() => ({
    addControl: jest.fn(),
    on: jest.fn(),
    remove: jest.fn(),
  })),
  NavigationControl: jest.fn(),
}));

const mockClient = {
  executeQuery: jest.fn(() => {
    const result = fromValue({
      data: {
        user: {
          _id: '60112cbad276833fa8b16c5f',
          username: 'john',
          profile_picture: 'picture.jpg',
          owned_routes: [
            {
              _id:1,
              name:'ownroute',
              grade:'4a', 
              picture:'SMD',
              type:'hddvDFF',
              public:true
            },
            {
              _id:2,
              name:'ownroute2',
              grade:'4a', 
              picture:'SMD',
              type:'hddvDFF',
              public:true
            }
          ]
        }
      },
      fetching: false,
      error: false
    },)
    return result;
  }),
  executeMutation: jest.fn(() => never),
  executeSubscription: jest.fn(() => never),
};



describe("myRoutes general tests", () => {
  beforeEach(() => {
    window.URL.createObjectURL = () => {};
  });


  test("should display logout and public routes", () => {
    const { container, getByText, getAllByText, getByRole } = render(
      <Provider value={mockClient}>
        <AuthProvider value={{user:'60112cbad276833fa8b16c5f'}}>
          <NetworkProvider>
            <Profile id='60112cbad276833fa8b16c5f'/>
          </NetworkProvider>
        </AuthProvider>
      </Provider>
    );
    
    // Expect the header text to be rendered
    expect(container.textContent).toMatch("Public Routes");
    // Expect username to be rendered on screen
    expect(getByText('john')).toBeInTheDocument();

    // Expected the number of owned routes to be 2.
    expect(getAllByText('4a')).toHaveLength(2)
    
    // Expect the Logout button to render.
    expect(getByRole('button', {name:'LOGOUT'}))
  });

}); 