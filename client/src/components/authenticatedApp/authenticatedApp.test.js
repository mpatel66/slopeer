
import "@testing-library/jest-dom";
import {  render, fireEvent } from "@testing-library/preact";
import { h } from "preact";
import Profile from '../../routes/profile';
import MyRoutes from '../../routes/myRoutes';
import AddRoute from '../../routes/addRoute';
import AuthenticatedApp from './index';
import { NetworkProvider } from '../../context/NetworkContext';
import { AuthProvider } from "../../context/AuthContext";

jest.mock('../../routes/map');
jest.mock('../../routes/profile');
jest.mock('../../routes/myRoutes');
jest.mock('../../routes/routeDetails');
jest.mock('../../routes/addRoute');
jest.mock('../../routes/editProfile');
jest.mock('../../routes/editRoute');
jest.mock('../redirect');



jest.mock("mapbox-gl", () => ({
  GeolocateControl: jest.fn(),
  Map: jest.fn(() => ({
    addControl: jest.fn(),
    on: jest.fn(),
    remove: jest.fn(),
  })),
  NavigationControl: jest.fn(),
}));


describe('Router test', () => {
  
  test("Router should render mock pages on load and onClick", () => {
    // Arrange
    MyRoutes.mockImplementation(() => <div>MyRouteMock</div>);
    AddRoute.mockImplementation(() => <div>MockAddRoute</div>);
    Profile.mockImplementation(() => <div>MockProfile</div>);
    
     const {getByText} = render(  
      <>
        <AuthProvider value={{user:'60112cbad276833fa8b16c5f'}}>
          <NetworkProvider>
              <AuthenticatedApp />
          </NetworkProvider>
        </AuthProvider>
      </>
    );

  // Helper function to get the footer buttons.
  function moveToNewPage(buttonName) {
    return getByText(buttonName);
  }
    
  // Expect the default component (MyRoutes) to load. 
  expect(getByText("MyRouteMock")).toBeInTheDocument(); 

  // User clicks to move to the Add Route pagel
  fireEvent.click(moveToNewPage('+'));    
  expect(getByText('MockAddRoute')).toBeInTheDocument;

  // User clicks to move to the Profile Page.
  fireEvent.click(moveToNewPage('Profile'))
      expect(getByText('MockProfile')).toBeInTheDocument;
    
  });

})