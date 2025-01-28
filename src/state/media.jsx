import { makeAutoObservable } from "mobx";

class media {
  constructor() {
    makeAutoObservable(this);
  }
  mobile = false;
  handlerResize = (size) => {
    if (size <= 900) {
      this.mobile = true;
    } else {
      this.mobile = false;
    }
  };
}

export default new media();
