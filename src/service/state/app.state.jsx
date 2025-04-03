import { makeAutoObservable } from "mobx";
import stateScenarios from "./state.scenarios";

class appState {
  constructor() {
    makeAutoObservable(this);
  }
  isAuth = true;

  templatesHTMLEmail = [];
  templatesHTMLPopup = [];
  templatesHTMLString = [];
  online_scenarios = [];
  planer_scenarios = [];
  offline_scenarios = [];
  counter_scenarios = [];
  collection = {
    data: [
      // Пользователи
      {
        name: "Пользователи",
        data: [],
        link: "users",
        count: 0,
      },
      // Клиенты
      {
        name: "Клиенты",
        data: [],
        link: "clients",
        count: 0,
      },
      // Посетители
      {
        name: "Посетители",
        data: [],
        link: "visitor",
        count: 0,
      },
    ],
    isLoader: false,
  };

  setScenarios = async (data) => {
    try {
      this.online_scenarios = data;
    } catch (e) {
      console.error(e);
    }
  };
  getPlanerList = async (data) => {
    try {
      this.planer_scenarios = data;
    } catch (e) {
      console.error(e);
    }
  };

  setParameters = (parametr, value) => {
    this[`${parametr}`] = value;
  };
  e = (data) => {
    const result = window.btoa(data);
    return result;
  };

  r = () => {
    let key = "";
    const abc =
      "qwertyuioplkjhgfdsazxcvbnmQWERTYUIOPLKJHGFDSAZXCVBNM0123456789";
    let randomKey = abc[Math.floor(Math.random() * abc.length)];
    while (key.length < 8) {
      key += randomKey;
      randomKey = abc[Math.floor(Math.random() * abc.length)];
    }
    return key;
  };

  rk = (data) => {
    const result = data.match(/^../);
    return result;
  };

  d = (data) => {
    const result = window.atob(data);
    return result;
  };
}
export default new appState();
