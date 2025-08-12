import axios from "axios";
const axiosInstance = axios.create({
  baseURL: 'http://localhost:8080/api/',
  timeout: 6000,
  // headers: {'X-Custom-Header': 'foobar'}


});
