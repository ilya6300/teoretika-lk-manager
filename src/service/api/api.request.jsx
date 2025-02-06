import axios from "axios";
import config from "../../config.json";
import { req } from "./api.config";
import { data } from "react-router";

class apiRequest {
  login = async (_email, _password) => {
    try {
      const res = await axios.post(`${config.url_api}auth`, {
        email: _email,
        password: _password,
      });
      if (!res) return;
      return res;
    } catch (e) {
      console.log(e);
      if (e.message === "Network Error") {
        return alert("Нет подключения к серверу");
      }
    }
  };

  getProfile = async () => {
    const res = await req("my_profile");
    if (!res) return;
    console.log(res.data.data);
    return res.data.data;
  };

  changePass = async (pass) => {
    await req.patch("my_profile/change_password", {
      password: pass,
    });
  };

  postHTMLTemplate = async () => {
    try {
      // Временные
      const data = [
        { name: "hello", data: "<body><h1>Привет!</h1><p>Как дела?</p></body" },
        { name: "hi", data: "<body><h1>Hi!!!!</h1><p>Как, hi, дела?</p></body" },
      ];
      // const res =
    } catch (e) {
      console.error(e);
    }
  };
}
export default new apiRequest();
