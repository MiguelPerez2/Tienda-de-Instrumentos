import axios from "axios";
import { getEnvVariables } from "../helpers/index.js";

  const { REACT_APP_API_URL }=getEnvVariables();
  const Resource_api = axios.create({
    baseURL:REACT_APP_API_URL
  });

  // Todo: configurar interceptores
  Resource_api.interceptors.request.use( config => {
    config.headers = {
      ...config.headers
    }
    return config;
  })


  export default Resource_api;