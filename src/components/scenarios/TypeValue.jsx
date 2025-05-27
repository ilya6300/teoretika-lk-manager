import React, { useEffect, useLayoutEffect, useState } from "react";
import ScenariosInpt from "../../UI/components/scenarios/ScenariosInpt";
import stateScenarios from "../../service/state/state.scenarios";
import SelectedConditionFilter from "./SelectedConditionFilter";
import { toJS } from "mobx";
import { observer } from "mobx-react-lite";
import iconEventListBtn from "../../images/icons/list_btn.png";

const TypeValue = observer(({ f, id, c }) => {
  const [value, setValue] = useState("");
  const [orValue, setOrValue] = useState("И");
  const [valueBooleanReg, setValueBooleanReg] = useState(false);
  const [condition, setCondition] = useState("");
  const [currentDate, setCurrentDate] = useState(false);
  const [currentDateName, setCurrentDateName] = useState("Текущая");
  // const [conditionName, setConditionName] = useState("");

  const editCurrentDateName = () => {
    if (currentDate) {
      setCurrentDateName("Текущая")
    } else {
      setCurrentDateName("Динамическая")
    }
    setCurrentDate(!currentDate);
  };

  const getTypeValue = (name) => {
    console.log(name);
    if (name === "==") {
      // setCondition("==");
      const conditionValue = { target: { value: "равно" } };
      return conditionValue;
      // setCondition("равно");
    }
    if (name === "!=") {
      // setCondition("==");

      const conditionValue = { target: { value: "не равно" } };
      return conditionValue;
      // setCondition("равно");
    }
    if (name === ">=") {
      // setCondition(">=");
      const conditionValue = { target: { value: "больше или равно" } };
      return conditionValue;
      // setCondition("больше или равно");
    }
    if (name === "<=") {
      // setCondition("<=");
      const conditionValue = { target: { value: "меньше или равно" } };
      return conditionValue;
      // setCondition("меньше или равно");
    }
    if (name === "like") {
      // setCondition("like");
      const conditionValue = { target: { value: "соответствует" } };
      return conditionValue;
      // setCondition("соответствует");
    }
    if (name === "in") {
      // setCondition("in");
      const conditionValue = { target: { value: "in" } };
      return conditionValue;
      // setCondition("in");
    }
  };

  useLayoutEffect(() => {
    setValue(
      typeof f.value === "string" ? f.value.replace(/%/gm, "") : f.value
    );
    console.log("TypeValue", toJS(f), f.condition);
    onChangeCondition(getTypeValue(f.condition));
  }, [f.value, f.condition]);

  const updateOr = () => {
    if (orValue === "И") {
      setOrValue("ИЛИ");
      setCondition("in");
      stateScenarios.updateOrElementFilter(f);
    } else {
      setOrValue("И");
      setCondition("in");
      stateScenarios.updateOrElementFilter(f);
    }
    stateScenarios.updateValueFilter(id, f.name, value, condition, f);
  };

  // Проверяем, является ли тип поля числовым
  const isNumeric = (type) => {
    return (
      type === "BIGINT" ||
      type === "NUMERIC(50, 4)" ||
      type === "FLOAT" ||
      type === "NUMERIC(15, 2)"
    );
  };

  useEffect(() => {
    if (value === "" || condition === "") return;

    console.log(
      "useEffect TypeValue",
      typeof condition,
      condition,
      typeof value,
      value
    );
    const parsedValue = isNumeric(f.info.type) ? Number(value) : value;
    stateScenarios.updateValueFilter(id, f.name, parsedValue, condition, f);
  }, [f, condition, value]);
  const onChangeCondition = (e) => {
    if (!e) return;
    // console.log(e.target.value);
    if (e.target.value === "равно") {
      setCondition("==");
    }
    if (e.target.value === "не равно") {
      setCondition("!=");
    }
    if (e.target.value === "больше или равно") {
      setCondition(">=");
    }
    if (e.target.value === "меньше или равно") {
      setCondition("<=");
    }
    if (e.target.value === "соответствует") {
      setCondition("like");
    }
    if (e.target.value === "in") {
      setCondition("in");
    }
  };
  const onChange = (e) => {
    console.log("onChange", e);
    const inputValue = e.target.value;

    // Если поле числовое, разрешаем только цифры и точку
    if (isNumeric(f.info.type)) {
      const isValidNumber = /^[0-9]*\.?[0-9]*$/.test(inputValue);
      if (!isValidNumber && inputValue !== "") return;
    }

    setValue(inputValue);
  };
  const onChangeBoolean = (boolean, funcboolean) => {
    stateScenarios.updateValueFilter(id, f.name, !boolean, condition, f);
    funcboolean(!boolean);
  };
  const onChangeDateTime = (e) => {
    setValue(`${e.target.value.replace(/T/g, " ")}:00`);
    stateScenarios.updateValueFilter(
      id,
      f.name,
      `${e.target.value.replace(/T/g, " ")}:00`,
      condition,
      f
    );
  };

  const eventChange = (e) => {
    const item = {
      target: {
        value: e.target.textContent,
      },
    };
    onChange(item);
    setEventFlag(false);
  };

  const eventsList = [
    "УДАЛИЛ ТОВАР ИЗ КОРЗИНЫ",
    "НАЧАЛ ЗВОНОК",
    "СДЕЛАЛ ЗАКАЗ",
    "ОСТАВИЛ ЗАЯВКУ",
    "ДОБАВИЛ ТОВАР В КОРЗИНУ",
    "ЗАКАЗАЛ УСЛУГУ",
    "ОСТАВИЛ ОТЗЫВ",
    "УСПЕШНО АВТОРИЗОВАЛСЯ",
  ];

  const [eventFlag, setEventFlag] = useState(false);
  const EventList = () => {
    if (f.name === "event_name") {
      return (
        <div className="event_btn_list">
          {eventFlag ? (
            <ul className="event_list_container">
              {eventsList.map((e) => (
                <li key={e} onClick={eventChange} className="event_list_item">
                  {e}
                </li>
              ))}
            </ul>
          ) : (
            <></>
          )}

          <img
            onClick={() => setEventFlag(!eventFlag)}
            className="event_btn_list_img"
            src={iconEventListBtn}
            alt="Кнопка вызова событий"
          />
        </div>
      );
    }
  };

  if (
    f.info.type === "UUID" ||
    f.info.type === "TEXT" ||
    f.info.type === "VARCHAR(5000)" ||
    f.info.type === "VARCHAR(1000)" ||
    f.info.type === "VARCHAR(255)" ||
    f.info.type === "VARCHAR(500)"
  ) {
    return (
      <div className="filter_inpt_container">
        <ScenariosInpt value={value} onChange={onChange} placeholder={f.name} />{" "}
        {/* {orValue === "И" ? ( */}
        <SelectedConditionFilter
          // data={c.condition}
          condition={condition}
          onChangeCondition={onChangeCondition}
          c={c}
        />
        {/* // ) : (
          // <span className="or_in">Точное совпадение</span>
        // )} */}
        <span className="or_btn" onClick={updateOr}>
          {orValue}
        </span>
        <EventList />
      </div>
    );
  } else if (
    f.info.type === "BIGINT" ||
    f.info.type === "NUMERIC(50, 4)" ||
    f.info.type === "FLOAT" ||
    f.info.type === "NUMERIC(15, 2)"
  ) {
    return (
      <div className="filter_inpt_container">
        <ScenariosInpt
          value={value}
          onChange={onChange}
          placeholder={f.name}
          type="number"
        />{" "}
        {/* {orValue === "И" ? ( */}
        <SelectedConditionFilter
          condition={condition}
          // data={c.condition}
          onChangeCondition={onChangeCondition}
          c={c}
        />
        {/* // ) : ( // <span>Точное совпадение</span>
        // )} */}
        <span className="or_btn" onClick={updateOr}>
          {orValue}
        </span>
      </div>
    );
  } else if (f.info.type === "TIMESTAMP") {
    return (
      <div className="filter_inpt_container">
        {!currentDate ? (
          <>
            <ScenariosInpt
              value={value}
              onChange={onChangeDateTime}
              placeholder={f.name}
              type="datetime-local"
            />
            {/* {orValue === "И" ? ( */}
            <SelectedConditionFilter
              condition={condition}
              // data={c.condition}
              onChangeCondition={onChangeCondition}
              c={c}
            />
            {/* // ) : ( // <span>Точное совпадение</span>
        // )} */}
            <span className="or_btn" onClick={updateOr}>
              {orValue}
            </span>
          </>
        ) : (
          <></>
        )}
        <span onClick={editCurrentDateName}>{currentDateName}</span>
      </div>
    );
  } else if (f.info.type === "BOOLEAN") {
    return (
      <div className="filter_inpt_container">
        <label
          onClick={() => onChangeBoolean(valueBooleanReg, setValueBooleanReg)}
          className={
            valueBooleanReg ? "my_checkbox_v1_active" : "my_checkbox_v1"
          }
        ></label>
        {/* {orValue === "И" ? ( */}
        <SelectedConditionFilter
          condition={condition}
          // data={c.condition}
          onChangeCondition={onChangeCondition}
          c={c}
        />
        {/* // ) : ( // <span>Точное совпадение</span>
        // )} */}
        <span className="or_btn" onClick={updateOr}>
          {orValue}
        </span>
      </div>
    );
  }
});

export default TypeValue;
