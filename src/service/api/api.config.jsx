import axios from "axios";
import config from "../../config.json";
import { useNavigate } from "react-router";
import appState from "../state/app.state";

export const req = axios.create({
  baseURL: config.url_api,
});

req.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${
    appState.d(localStorage.getItem("at")) +
    appState.rk(appState.d(localStorage.getItem("k")))
  }`;
  return config;
});

req.interceptors.response.use(
  (config) => {
    return config;
  },
  (e) => {
    // const navigate = useNavigate();
    if (axios.isAxiosError(e)) {
      console.error(e);
      if (e.message === "Network Error") {
        return alert("Нет подключения к серверу");
      }
      if (e.status === 401) {
        localStorage.removeItem("at");
        return appState.setParameters("isAuth", false);
        // return navigate("/login");
      }
      throw e;
    }
  }
);
