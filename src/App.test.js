import App from './App';
import Adapter from "enzyme-adapter-react-16";
import '@testing-library/jest-dom';
import Enzyme from "enzyme";
import { shallow } from 'enzyme';
Enzyme.configure({ adapter: new Adapter() });

describe("List Test Case", () => {
  it("renders app component", () => {
    shallow(<App />);
  });
});
