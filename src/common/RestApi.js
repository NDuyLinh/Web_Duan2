import axios from "axios";

const defaultRequest = {
  baseURL: process.env.NODE_ENV === 'development' ? 'http://localhost:8080/' :'/'
}

const defaultRestApi = axios.create(defaultRequest);

defaultRestApi.interceptors.request.use(function (config) {
  config.params = {
    '_': new Date().getTime(),
  };
  return config;
}, function (error) {
  // Do something with request error
  return Promise.reject(error);
});

export default defaultRestApi;