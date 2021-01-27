import "@testing-library/jest-dom";
import Render from "preact-render-to-string";
import { render, fireEvent, screen, waitFor, getByText} from "@testing-library/preact";
import { AuthProvider } from "../../context/AuthContext";
import { Provider } from '@urql/preact';
import { never, fromValue } from 'wonka';
// // test-setup.js
import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-preact-pure';
import MyRoutes from "./index.tsx";
import { h } from "preact";
import largeRouteCard from '../../components/largeRouteCard/largeRouteCard.tsx'
import { LargeRouteCard } from '../../components';
// import {mockClient, MapMock} from '../../../tests/__mocks__/Mocks'
configure({ adapter: new Adapter() });


jest.mock("mapbox-gl", () => ({
  GeolocateControl: jest.fn(),
  Map: jest.fn(() => ({
    addControl: jest.fn(),
    on: jest.fn(),
    remove: jest.fn(),
  })),
  NavigationControl: jest.fn(),
}));

jest.mock('@urql/preact', () => { 
  return function useQuery() {
  return [{
      data: {
        user:{
      _id:1234, 
      owned_routes:{
        _id:1,
        name:'ownroute',
        grade:'a',
        picture:'SMD',
        type:'hddvDFF',
      },
      saved_routes:[
        {
        _id:111,
        name:'savedroute',
        grade:'wqdd',
        picture:'picture',
        type:'SDmHVBSdj', 
      },
      {
        _id:4444,
        name:'savedroute2',
        grade:'2',
        picture:'W2F',
        type:'kjsdbsbd' 
      },
    ]
    }},
    fetching:false, 
    error:false
    }, 'SDM']
}})
  

describe("myRoutes general tests", () => {
  beforeEach(() => {
    window.URL.createObjectURL = () => {};
  });
  test("should display initial routes", () => {

    const { container } = render(
      <AuthProvider>
        <MyRoutes />
      </AuthProvider>
    );
    expect(container.textContent).toMatch("OWNED ROUTES");
    expect(container.textContent).toMatch("SAVED ROUTES");
  });

  test("rendered component should match snapshot", () => {
    const tree = Render(
      <AuthProvider>
        <MyRoutes />
      </AuthProvider>
    );
    expect(tree).toMatchInlineSnapshot(
      `"<header class=\\"header\\"><nav><button class=\\"selected\\">OWNED ROUTES</button><button class>SAVED ROUTES</button></nav></header><div class=\\"spinner_wrapper\\"><div class=\\"spinner\\"></div></div>"`
    );
  });
});

describe('server querying tests', () => {
  beforeEach(() => {
    window.URL.createObjectURL = () => {};
  });

  test('component calls the query on load', () => {
    const wrapper = mount(
      <AuthProvider>
      <Provider value={mockClient}>
        <MyRoutes  />
      </Provider>
      </AuthProvider>
     
    );
    
    expect(mockClient.executeQuery).toBeCalledTimes(1);


  });
  
  
  jest.mock('../../components/largeRouteCard/index', ()=> () =>
      <div data-testid='largeRouteCard'>saved route 2</div>
    )

//   test('renders route on screen', () => {
//     const {getByTestId, container} = render(
//       <Provider value={mockClient}>
//         <AuthProvider>
//         <MyRoutes/>
//         </AuthProvider>
//       </Provider>
//     );
//       expect(getByTestId(/largeRouteCard/)).toBeInTheDocument()

//     const button = getByText(/SAVED ROUTES/i);
//     fireEvent.click(button);
//     expect(getByTestId(/largeRouteCard/)).toContain('savedroute2')   
//   });
})
