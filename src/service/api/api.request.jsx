import axios from "axios";
import config from "../../config.json";
import { req } from "./api.config";
import appState from "../state/app.state";
import { toJS } from "mobx";
import stateScenarios from "../state/state.scenarios";

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

  getAllClient = async () => {
    if (appState.collection.isLoader) return;
    const [users_collect, client_collect, visitor_collect] = await Promise.all([
      req("customers/users_collect"),
      req("customers/client_collect"),
      req("customers/visitor_collect"),
    ]);
    appState.setParameters(`collection`, {
      data: [
        // Пользователи
        {
          name: "Пользователи",
          data: users_collect.data.data.data,
          link: "users",
          count: users_collect.data.data.all_count,
        },
        // Клиенты
        {
          name: "Клиенты",
          data: client_collect.data.data.data,
          link: "clients",
          count: client_collect.data.data.all_count,
        },
        // Посетители
        {
          name: "Посетители",
          data: visitor_collect.data.data.data,
          link: "visitor",
          count: visitor_collect.data.data.all_count,
        },
      ],
      isLoader: true,
    });
  };

  getProfile = async () => {
    const res = await req("my_profile");
    if (!res) return;
    console.log(res.data.data);
    return res.data.data;
  };
  patchDateProfile = async (obj) => {
    console.log(obj);
    const res = await req.patch("my_profile", obj);
    console.log(res);
  };

  changePass = async (pass) => {
    await req.patch("my_profile/change_password", {
      password: pass,
    });
  };

  getHTMLTemplateEmail = async () => {
    try {
      const res = await req("templates");
      if (!res) return;
      appState.setParameters("templatesHTMLEmail", res.data.data.response);
      return res.data.data.response;
    } catch (e) {
      console.error(e);
    }
  };

  getHTMLTemplatePopup = async () => {
    try {
      const res = await req("routing");
      if (!res) return;
      appState.setParameters("templatesHTMLPopup", res.data.data.response);
      return res.data.data.response;
    } catch (e) {
      console.error(e);
    }
  };
  getHTMLTemplatString = async () => {
    try {
      const res = await req("strings");
      if (!res) return;
      appState.setParameters("templatesHTMLString", res.data.data.response);
      return res.data.data.response;
    } catch (e) {
      console.error(e);
    }
  };

  postHTMLTemplate = async (obj) => {
    try {
      const res = await req.post("templates", obj);
      console.log(res);
      return res.data.success;
    } catch (e) {
      console.error(e);
    }
  };

  removeHTMLTemplate = async (obj) => {
    try {
      console.log(obj);
      const res = await axios.delete(`${config.url_api}templates`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${
            appState.d(localStorage.getItem("at")) +
            appState.rk(appState.d(localStorage.getItem("k")))
          }`,
        },
        data: {
          id_template: [obj.id],
        },
      });
      console.log(res);

      // return res.data.success;
    } catch (e) {
      console.error(e);
    } finally {
      setTimeout(() => {
        this.getHTMLTemplate();
      }, 1500);
    }
  };

  patchPopup = async (id, obj) => {
    try {
      const res = await req.patch(`routing/${id}`, obj);
      console.log(res);
      return res.data.success;
    } catch (e) {
      console.error(e);
    }
  };

  patchEmail = async (id, obj) => {
    try {
      const res = await req.patch(`templates/${id}`, obj);
      console.log(res);
      return res.data.success;
    } catch (e) {
      console.error(e);
    }
  };

  getFilterJoin = async (name) => {
    try {
      const res = await req.post("search/fields", {
        fields: name,
      });
      console.log("getFilter", res.data.data);
      return res.data.data;
    } catch (e) {
      console.error(e);
    }
  };

  getFilter = async () => {
    try {
      const res = await req.post("search/filter_user", {
        join: stateScenarios.join_data,
        filter: stateScenarios.filter_data,
        order: {},
      });
      console.log("getFilter ==> ", res.data.data);
      return res.data.data;
    } catch (e) {
      console.error("getFilter", e);
    }
  };
  getOnlineScenarios = async () => {
    try {
      const res = await req("online_scripts");
      if (!res) return;
      appState.setParameters("online_scenarios", res.data.data.response);
      return res.data.data.response;
    } catch (e) {
      console.error(e);
    }
  };
  postOnlineScenarios = async (obj) => {
    try {
      const res = await req.post(`online_script`, obj);
      console.log("postOnlineScenarios", res);
      return res.data;
    } catch (e) {
      console.error(e);
    }
  };
  patchOnlineScenarios = async (id, obj) => {
    try {
      const res = await req.patch(`online_script/${id}`, obj);
      console.log("postOnlineScenarios", res);
      return res.data;
    } catch (e) {
      console.error(e);
    }
  };
}
export default new apiRequest();
