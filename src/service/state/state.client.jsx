import { makeAutoObservable } from "mobx";

class StateClient {
  constructor() {
    makeAutoObservable(this);
  }

  client = null;

  setParameters = (parametr, value) => {
    this[`${parametr}`] = value;
  };
}
export default new StateClient();
