import { makeAutoObservable } from "mobx";

class appState {
  constructor() {
    makeAutoObservable(this);
  }
  isAuth = true;
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
