import axios from '../axios';
import {
  FETCH_BOOK_DETAILS_ERROR,
  FETCH_BOOK_DETAILS_SUCCESS,
  FETCH_BOOK_DETAILS
} from './actionConstants'

export const fetchBookDetails = (title = '') => (dispatch) => {
  dispatch({ type: FETCH_BOOK_DETAILS })
  const bookTitle = title.toLowerCase().replace(/\s/g, '+')
  axios.get(`/search.json?q=${bookTitle}`).then((data) => {
    const bookArr = [];
    (data?.data?.docs || []).forEach((b) => {
      const obj = {
        title: b?.title || '-',
        author: b?.author_name ? b?.author_name?.join(', ') : '-',
        publishDate: b?.publish_date ? b?.publish_date[0] : '-',
        cover: b?.cover_i
      }
      bookArr.push(obj);
    })
    dispatch({
      type: FETCH_BOOK_DETAILS_SUCCESS,
      payload: bookArr
    })
  }).catch((err) => {
    console.log(err);
    dispatch({
      type: FETCH_BOOK_DETAILS_ERROR,
      payload: err
    })
  })
}