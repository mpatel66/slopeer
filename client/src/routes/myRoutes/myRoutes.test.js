import "@testing-library/jest-dom";
import Render from "preact-render-to-string";
import { render, fireEvent, screen, waitFor, getByText} from "@testing-library/preact";
import { AuthProvider } from "../../context/AuthContext";
import { Provider } from '@urql/preact';
import { never, fromValue, fromArray, pipe, delay } from 'wonka';
import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-preact-pure';
import MyRoutes from "./index.tsx";
import { h } from "preact";
import largeRouteCard from '../../components/largeRouteCard/largeRouteCard.tsx'
import { LargeRouteCard } from '../../components';

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

const mockClient = {
  executeQuery: jest.fn(() => {
  const result= fromValue({
      data: {
        user:{
      _id:1234, 
      owned_routes:[
        {
        _id:1,
        name:'ownroute',
        grade:'4a', 
        picture:'SMD',
        type:'hddvDFF',
      }
    ],
      saved_routes:[
      {
        _id:4444,
        name:'savedroute2',
        grade:'4a',
        picture:'W2F',
        type:'kjsdbsbd' 
      },
    ]
    }},
    fetching:false, 
    error:false
    }, )
    return result } ), 
  executeMutation: jest.fn(() => never),
  executeSubscription: jest.fn(() => never),
};


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
        <MyRoutes _id={1234} />
      </Provider>
      </AuthProvider>
     
    );
    expect(mockClient.executeQuery).toBeCalledTimes(1);
    
  });
  
  
  // jest.mock('../../components/largeRouteCard/index', ()=> () =>
  //     <div data-testid='largeRouteCard'>saved route 2</div>
  //   )
    // expect(getByTestId(/largeRouteCard/)).toContain('savedroute2')

  test('renders own routes (default) and saved routes on click', () => {
    const {getByTestId, container, getByText} = render(
      <Provider value={mockClient}>
        <AuthProvider>
        <MyRoutes />
        </AuthProvider>
      </Provider>
    );
   
    expect(getByText('4a')).toBeInTheDocument()

    const button = getByText('SAVED ROUTES');
    fireEvent.click(button);
    expect(getByText('savedroute2')).toBeInTheDocument()
  });
})
