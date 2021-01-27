import "@testing-library/jest-dom";
import Render from "preact-render-to-string";
import {render} from '@testing-library/preact'
import { AuthProvider } from "../../context/AuthContext";
import { NetworkProvider } from "../../context/NetworkContext";
import Footer from "./index";
import { h } from "preact";

jest.mock("mapbox-gl", () => ({
  GeolocateControl: jest.fn(),
  Map: jest.fn(() => ({
    addControl: jest.fn(),
    on: jest.fn(),
    remove: jest.fn(),
  })),
  NavigationControl: jest.fn(),
}));

describe("footer rendering with links", () => {
  beforeEach(() => {
    window.URL.createObjectURL = () => {};
  });

 
  test("should be a link", () => {
    const { getByText } = render(
      <AuthProvider>
        <NetworkProvider>
          <Footer />
        </NetworkProvider>
      </AuthProvider>
    );
    expect(getByText("Map")).not.toBeDisabled();
    expect(getByText("My Routes")).not.toBeDisabled();
    expect(getByText("Profile")).not.toBeDisabled();
    expect(getByText("+")).not.toBeDisabled();
  });
  test("should be visible", () => {
    const { getByText } = render(
      <AuthProvider>
        <NetworkProvider>
          <Footer />
        </NetworkProvider>
      </AuthProvider>
    );
    expect(getByText("Map")).toBeVisible();
    expect(getByText("My Routes")).toBeVisible();
    expect(getByText("Profile")).toBeVisible();
    expect(getByText("+")).toBeVisible();
  });

  test("rendered component should match snapshot", () => {
    const tree = Render(
      <AuthProvider>
        <NetworkProvider>
          <Footer />
        </NetworkProvider>
      </AuthProvider>
    );
    expect(tree).toMatchInlineSnapshot(
      `"<footer class=\\"footer\\"><div class=\\"content\\"><nav><a href=\\"/map\\" class>Map</a><button class=\\"addRoute\\">+</button><a href=\\"/\\" class=\\"active\\">My Routes</a><a href=\\"/profile/null\\" class>Profile</a></nav></div></footer>"`
    );
  });
});
