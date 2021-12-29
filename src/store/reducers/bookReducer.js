import {
  FETCH_BOOK_DETAILS_ERROR,
  FETCH_BOOK_DETAILS_SUCCESS,
  FETCH_BOOK_DETAILS
} from '../../actions/actionConstants';

const initialState = {
  loading: false,
  books: [],
  error: ''
}

const bookReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_BOOK_DETAILS: {
      return {
        error: '',
        loading: true,
        books: []
      }
    }
    case FETCH_BOOK_DETAILS_SUCCESS: {
      const { payload } = action;
      return {
        error: '',
        loading: false,
        books: [...payload]
      }
    }
    case FETCH_BOOK_DETAILS_ERROR: {
      return {
        error: '',
        loading: false,
        books: []
      }
    }
    default: {
      return state;
    }
  }
}
export default bookReducer;