import axios from "axios";

import { API_DOMAIN, JWT_TOKEN, I18N_LANGUAGE } from "../../config";
import { toast } from "react-toastify";
import store from '../../store'

const apiAxios = axios.create();
const authorization = localStorage.getItem(JWT_TOKEN);
const locale = localStorage.getItem(I18N_LANGUAGE);

apiAxios.defaults.baseURL = API_DOMAIN;
apiAxios.defaults.headers.common["Authorization"] = `Bearer: ${authorization}`;
apiAxios.defaults.headers.common["Accept-Language"] = locale;

apiAxios.interceptors.request.use((config) => {
  const { dispatch } = store

  dispatch({ type: 'LOADING_UI' })

  return config;
});

apiAxios.interceptors.request.use(function (config) {
  if (config.params) {
    for (const key of Object.keys(config.params)) {
      config.params[key] = JSON.stringify(config.params[key]);
    }
  }
  return config;
});

apiAxios.interceptors.response.use(

  function ({ data, config }) {
    const { dispatch } = store
    dispatch({ type: 'CLEAR_ERRORS' })

    dispatch({
      type: 'SET_AUTH_ERROR',
      payload: null
    })
    const { $token, $message } = data;

    if ($token) {
      localStorage.setItem(JWT_TOKEN, $token);
      apiAxios.defaults.headers.common["Authorization"] = `Bearer: ${$token}`;
    }

    if ($message) {
      toast.success($message, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });
        
    }

    return data;
  },
  function (error) {
    const { dispatch } = store
    setTimeout(() => {
      dispatch({ type: 'NO_LOADING' })
    }, 300)
    
    if (error.response?.data?.$message) {
      toast.error(error.response?.data?.$message, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });
    }

    else if (error.response?.data?.$message?.message) {
      // toast.error(error.response?.data?.$message.message); 
      toast.error(error.response?.data?.$message.message, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });
    }

    else {
      toast.error('Une erreur est survenue merci de réessayer plus tard')
    }

  }
);

// loadProgressBar(null, apiAxios)

export default apiAxios;
