import axios from "axios";
import config from "../../config.json";
import { req, reqPlaner } from "./api.config";
import appState from "../state/app.state";
import { toJS } from "mobx";
import stateScenarios from "../state/state.scenarios";

class apiRequest {
  login = async (_email, _password) => {
    try {
      const res = await axios.post(`${config.url_api}auth/`, {
        email: _email,
        password: _password,
      });
      if (!res) return;
      return res;
    } catch (e) {
      console.error(e);
      if (e.message === "Network Error") {
        return alert("Нет подключения к серверу");
      }
    }
  };

  getAllClient = async () => {
    if (appState.collection.isLoader) return;
    const [users_collect, client_collect, visitor_collect] = await Promise.all([
      req("customers/users_collect/"),
      req("customers/client_collect/"),
      req("customers/visitor_collect/"),
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
    const res = await req("my_profile/");
    if (!res) return;
    return res.data.data;
  };
  patchDateProfile = async (obj) => {
    const res = await req.patch("my_profile/", obj);
  };

  changePass = async (pass) => {
    await req.patch("my_profile/change_password/", {
      password: pass,
    });
  };

  getHTMLTemplateEmail = async () => {
    try {
      const res = await req("templates/");
      if (!res) return;
      appState.setParameters("templatesHTMLEmail", res.data.data.response);
      return res.data.data.response;
    } catch (e) {
      console.error(e);
    }
  };

  getHTMLTemplatePopup = async () => {
    try {
      const res = await req("routing/");
      if (!res) return;
      appState.setParameters("templatesHTMLPopup", res.data.data.response);
      return res.data.data.response;
    } catch (e) {
      console.error(e);
    }
  };
  getHTMLTemplatString = async () => {
    try {
      const res = await req("strings/");
      if (!res) return;
      appState.setParameters("templatesHTMLString", res.data.data.response);
      return res.data.data.response;
    } catch (e) {
      console.error(e);
    }
  };

  postHTMLTemplate = async (obj) => {
    try {
      const res = await req.post("templates/", obj);
      return res.data.success;
    } catch (e) {
      console.error(e);
    }
  };

  removeHTMLTemplate = async (obj) => {
    try {
      const res = await axios.delete(`${config.url_api}templates/`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${appState.d(localStorage.getItem("at")) + appState.rk(appState.d(localStorage.getItem("k")))}`,
        },
        data: {
          id_template: [obj.id],
        },
      });
    } catch (e) {
      console.error(e);
    } finally {
      setTimeout(() => {
        this.getHTMLTemplate();
      }, 1500);
    }
  };

  postPopup = async (obj) => {
    try {
      const res = await req.post(`routing/`, obj);
      return res.data.success;
    } catch (e) {
      console.error(e);
    }
  };

  patchPopup = async (id, obj) => {
    try {
      const res = await req.patch(`routing/${id}`, obj);
      return res.data.success;
    } catch (e) {
      console.error(e);
    }
  };

  postString = async (obj) => {
    try {
      const res = await req.post(`strings/`, obj);
      return res.data.success;
    } catch (e) {
      console.error(e);
    }
  };

  patchString = async (id, obj) => {
    try {
      const res = await req.patch(`strings/${id}`, obj);
      return res.data.success;
    } catch (e) {
      console.error(e);
    }
  };

  patchEmail = async (id, obj) => {
    try {
      const res = await req.patch(`templates/${id}`, obj);
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
      stateScenarios.setParametr("resultevent", res.data.data);
      return res.data.data;
    } catch (e) {
      console.error("getFilter", e);
      stateScenarios.setParametr("resultevent", []);
    }
  };
  getOnlineScenarios = async () => {
    try {
      const res = await req("online_scripts");
      if (!res) return;
      appState.setScenarios(res.data.data.response);
      return res.data.data.response;
    } catch (e) {
      console.error(e);
    }
  };
  getTemplaterList = async () => {
    try {
      const res = await reqPlaner("notifications_task_scheduler/get_scheduler_tasks");
      if (!res) return;
      appState.getPlanerList(res.data.response);
      return res.data.response;
    } catch (e) {
      console.error(e);
    }
  };
  postOnlineScenarios = async (obj) => {
    try {
      const res = await req.post(`online_scripts/`, obj);
            return res.data;
    } catch (e) {
      console.error(e);
    }
  };
  patchOnlineScenarios = async (id, obj) => {
    try {
      const res = await req.patch(`online_scripts/${id}`, obj);
            return res.data;
    } catch (e) {
      console.error(e);
    }
  };

  removeOnlineScenarios = async (id) => {
    try {
      const res = await req.delete(`online_scripts/`, {
        data: { id_scripts: [id] },
      });
            return res.data;
    } catch (e) {
      console.error(e);
    }
  };

  emailPostOne = async (data) => {
    try {
      const res = await reqPlaner.post("notifications_user_email/add_message", data);
      return res.data.response;
    } catch (e) {
      console.error(e);
    }
  };

  emailPostPlaner = async (data) => {
    try {
      const res = await reqPlaner.post("notifications_task_scheduler/post_scheduler_email", data);
            return res.data.success;
    } catch (e) {
      console.error(e);
    }
  };

  getReport = async () => {
    try {
      const res = await req("report");
      if (res) {
        appState.setParameters("counter_scenarios", res.data.data.response);
      }
    } catch (e) {
      // console.error(e);
    }
  };

  removeEmailPlaner = async (id) => {
    try {
      const res = await reqPlaner.delete(`notifications_task_scheduler/delete_scheduler_tasks?message_id=${id}`);
            return res.data;
    } catch (e) {
      console.error(e);
    }
  };
}
export default new apiRequest();
