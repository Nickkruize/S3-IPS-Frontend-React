import Layout from '../Layout';
import NavMenu from '../NavMenu';
import { shallow } from "enzyme";
import {setupTests} from '../setupTests';
import App from '../App';


it("renders without crashing", async () => {
  const wrapper = shallow(<App />);
  expect(wrapper).toBeTruthy()
})

it("calls layout at least once", async() => {
  const wrapper = shallow(<App />);
  expect(wrapper.find(Layout).length).toEqual(1);
});

it("calls Navmenu at least once", async() => {
  const wrapper = shallow(<Layout />);
  expect(wrapper.find(NavMenu).length).toEqual(1);
});


