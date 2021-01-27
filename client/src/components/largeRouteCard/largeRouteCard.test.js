import "@testing-library/jest-dom";
import largeRouteCard from "./index";
import { h } from "preact";
import render from "preact-render-to-string";

jest.mock("mapbox-gl", () => ({
  GeolocateControl: jest.fn(),
  Map: jest.fn(() => ({
    addControl: jest.fn(),
    on: jest.fn(),
    remove: jest.fn(),
  })),
  NavigationControl: jest.fn(),
}));

describe("largeroutecard test", () => {
  beforeEach(() => {
    window.URL.createObjectURL = () => {};
  });

  test("rendered component should match snapshot", () => {
    const tree = render(<largeRouteCard/>);
    expect(tree).toMatchInlineSnapshot(`"<largeRouteCard></largeRouteCard>"`);
  });
});
