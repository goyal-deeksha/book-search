import axios from 'axios';

const instance = axios.create({
  baseURL:'http://openlibrary.org'
});


export default instance;