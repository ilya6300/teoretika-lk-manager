import { makeAutoObservable, toJS } from "mobx";
import apiRequest from "../api/api.request";

class currentObj {
  constructor(id, current, data, filter, name) {
    this.id = id; // По нему будем очищать массив, если предыдущий элемент перевыбран
    this.current = current; // Имя таблицы
    this.flag_filter = false; // включает редактирование по таблице
    this.filter = filter; // списко фильтров
    this.condition = [
      {
        name: "равно",
        value: "==",
      },
      {
        name: "не равно",
        value: "!=",
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
        name: "соответствует",
        value: "like",
      },
      {
        name: "in",
        value: "in",
      },
    ]; //Условие
    this.data = data; // Следующий массив
    this.active_condition = "";
    this.string_condition = ""; // Строка условия
    this.name = name; //
    makeAutoObservable(this);
  }
}

class stateScenarios {
  constructor() {
    makeAutoObservable(this);
  }
  type_scenarios = {
    popup: true,
    string: true,
    planer: true,
  };

  setParametrTypeParametr = (parametr, boolean) => {
    this.type_scenarios[`${parametr}`] = boolean;
  };
  build_data = [];
  join_data = [];
  filter_data = {};
  // offlineScenarios = [];
  offlineScenariosInterface = [];
  resultevent = [];

  resetData = async (parametr) => {
    this[`${parametr}`] = [];
    this.build_data = [];
    await apiRequest.getFilter();
  };

  setParametr = (parametr, result) => {
    this[`${parametr}`] = result;
  };

  cutData = async (len) => {
    try {
      this.offlineScenariosInterface.length = len + 1;
      this.join_data.length = len + 1;
      this.build_data.length = len + 1;
      Object.keys(this.filter_data).forEach((key) => {
        // Если ключ отсутствует в массиве `b`, удаляем его из объекта `a`
        if (!this.join_data.includes(key)) {
          delete this.filter_data[key];
        }
      });
    } catch (e) {
      console.error(e);
    } finally {
      await apiRequest.getFilter();
    }
  };

  scenariosElementremove = async (len) => {
    this.offlineScenariosInterface.length = len;
    await apiRequest.getFilter();
  };

  addJoinData = (current, nameBuild) => {
    this.join_data = [...this.join_data, current];
    this.build_data = [...this.build_data, nameBuild];
  };
  removeJoinData = (current) => {
    this.join_data = this.join_data.filter((j) => j !== current);
  };

  updateValueFilterCurrentDate = async (id, name, interval, currentDate) => {
    try {
      const rowFilterID = this.offlineScenariosInterface[id].filter.find((row) => row.name === name);
      if (rowFilterID) {
        this.filter_data[`${this.offlineScenariosInterface[id].current}`] = {
          ...this.filter_data[`${this.offlineScenariosInterface[id].current}`],
          [`${rowFilterID.name}`]: ["current_data", ">=", interval],
        };
      }
    } catch (e) {
      console.error(e);
    }
  };

  updateValueFilter = async (id, name, value, condition, f) => {
    try {
      if (!value) return;

      const rowFilterID = this.offlineScenariosInterface[id].filter.find((row) => row.name === name);
      if (rowFilterID && rowFilterID.name) {
        rowFilterID.value = value;
        if (!f.or) {
          // Если И
          if (rowFilterID.value !== "") {
            this.filter_data[`${this.offlineScenariosInterface[id].current}`] = {
              ...this.filter_data[`${this.offlineScenariosInterface[id].current}`],
              [`${rowFilterID.name}`]: [condition !== "like" ? rowFilterID.value : `%${rowFilterID.value}%`, condition],
            };
          }
        } else {
          // Если ИЛИ
          if (rowFilterID.value !== "") {
            const newValue = rowFilterID.value.split(",");
            const likeNewValue = newValue.map((v) => `%${v.replace(/ /g, "")}%`);
            // const modifiedArray = array.map(item => `%${item}%`);
            // const or = rowFilterID.value.replace(/,\s/gm, ",");
            this.filter_data[`${this.offlineScenariosInterface[id].current}`] = {
              ...this.filter_data[`${this.offlineScenariosInterface[id].current}`],
              [`${rowFilterID.name}`]: condition !== "like" ? newValue : likeNewValue,
              condition,
             };
          }
        }
        if (
          rowFilterID.value === "" &&
          JSON.stringify(this.filter_data) !== "{}" &&
          this.filter_data[`${this.offlineScenariosInterface[id].current}`]
        ) {
          delete this.filter_data[`${this.offlineScenariosInterface[id].current}`][`${rowFilterID.name}`];
        }
      }

      await apiRequest.getFilter();
    } catch (e) {
      console.error(e);
    }
  };

  updateSwitchFilter = async (id, name) => {
    try {
      const rowFilterID = this.offlineScenariosInterface[id].filter.find((row) => row.name === name);
      if (rowFilterID) {
        rowFilterID.filter = !rowFilterID.filter;
      }
      if (!rowFilterID.filter && JSON.stringify(this.filter_data) !== "{}") {
        delete this.filter_data[`${this.offlineScenariosInterface[id].current}`][`${rowFilterID.name}`];
        await apiRequest.getFilter();
      }
    } catch (e) {
      console.error(e);
    }
  };

  updateOrElementFilter = async (f) => {
    f.or = !f.or;
    setTimeout(async () => {
      await apiRequest.getFilter();
    }, 200);
  };

  pushOfflineScenariosInterface = (current, data, filter, name) => {
    this.offlineScenariosInterface = [
      ...this.offlineScenariosInterface,
      new currentObj(
        this.offlineScenariosInterface.length,
        current,
        Object.entries(data).map(([name, value]) => ({ name, value })),
        Object.entries(filter).map(([name, info]) => ({
          name,
          info,
          filter: false,
          value: "",
          or: false,
        })),
        name
      ),
    ];
  };
}
export default new stateScenarios();
