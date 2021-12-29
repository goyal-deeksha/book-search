import React from 'react';
import Adapter from "enzyme-adapter-react-16";
import '@testing-library/jest-dom';
import Enzyme from "enzyme";
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {BookList} from './bookList';
Enzyme.configure({ adapter: new Adapter() });

const mockStore = configureMockStore([thunk]);

describe("BookList", () => {
  it("should render booklist component", () => {
    const store = mockStore({
      books: [],
      loading: false
    })
    mount(
      <Provider store={store}>
        <BookList />
      </Provider>
    )
  });
});