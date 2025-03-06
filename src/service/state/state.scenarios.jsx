import { makeAutoObservable, toJS } from "mobx";

class currentObj {
  constructor(id, current, data) {
    this.id = id; // По нему будем очищать массив, если предыдущий элемент перевыбран
    this.current = current; // Имя таблицы
    this.flag_filter = false; // включает редактирование по таблице
    this.condition = [
      {
        name: "равно",
        value: "==",
      },
      {
        name: "больше или равно",
        value: ">=",
      },
      {
        name: "меньше или равно",
        value: "<=",
      },
      {
        name: "совпадение",
        value: "like",
      },
      {
        name: "in",
        value: "in",
      },
    ]; //Условие
    this.data = data;
    this.active_condition = "";
    this.string_condition = ""; // Строка условия
    makeAutoObservable(this);
  }
}

class stateScenarios {
  constructor() {
    makeAutoObservable(this);
  }
  join_data = [];
  filter_data = {};

  offlineScenariosInterface = [];

  resetData = (parametr) => {
    this[`${parametr}`] = [];
  };

  updateData = (parametr, obj) => {
    const oldID = this[`${parametr}`].find((a) => a === obj);
    console.log("==== oldID ====", oldID);
    this[`${parametr}`] = [...this[`${parametr}`], obj];
    console.log("this[`${parametr}`]", toJS(this[`${parametr}`]));
  };

  pushOfflineScenariosInterface = (name, data) => {
    this.offlineScenariosInterface = [
      ...this.offlineScenariosInterface,
      new currentObj(
        this.offlineScenariosInterface.length,
        name,
        Object.entries(data).map(([name, value]) => ({ name, value }))
      ),
    ];
    console.log(toJS(this.offlineScenariosInterface));
  };

  updateOfflineScenariosInterface = (obj, parametr, value) => {
    try {
      console.log(obj);
      const objID = this.offlineScenariosInterface.find((s) => s.id === obj.id);
      if (objID) {
        console.log("objID ===>", objID);
        objID[`${parametr}`] = value;
      }
    } catch (e) {
      console.error(e);
    }
  };
}
export default new stateScenarios();
