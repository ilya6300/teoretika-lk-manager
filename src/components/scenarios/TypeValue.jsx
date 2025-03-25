import React, { useEffect, useLayoutEffect, useState } from "react";
import ScenariosInpt from "../../UI/components/scenarios/ScenariosInpt";
import stateScenarios from "../../service/state/state.scenarios";
import SelectedConditionFilter from "./SelectedConditionFilter";
import { toJS } from "mobx";
import { observer } from "mobx-react-lite";

const TypeValue = observer(({ f, id, c }) => {
  const [value, setValue] = useState("");
  const [orValue, setOrValue] = useState("И");
  const [valueBooleanReg, setValueBooleanReg] = useState(false);
  const [condition, setCondition] = useState("");
  // const [conditionName, setConditionName] = useState("");

  const getTypeValue = (name) => {
    if (name === "==") {
      // setCondition("==");
      setCondition("равно");
    }
    if (name === ">=") {
      // setCondition(">=");
      setCondition("больше или равно");
    }
    if (name === "<=") {
      // setCondition("<=");
      setCondition("меньше или равно");
    }
    if (name === "like") {
      // setCondition("like");
      setCondition("совпадение");
    }
    if (name === "in") {
      // setCondition("in");
      setCondition("in");
    }
  };

  useLayoutEffect(() => {
    setValue(f.value);
    // setCondition(f.condition);
    getTypeValue(f.condition);
    console.log("TypeValue", toJS(f), f.condition);
    const changeValue = {
      target: {
        value: f.condition,
      },
    };
    // setConditionName()
    onChangeCondition(changeValue);
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
  useEffect(() => {
    stateScenarios.updateValueFilter(id, f.name, value, condition, f);
  }, [f, condition]);
  const onChangeCondition = (e) => {
    console.log(e.target.value);
    if (e.target.value === "равно") {
      setCondition("==");
    }
    if (e.target.value === "больше или равно") {
      setCondition(">=");
    }
    if (e.target.value === "меньше или равно") {
      setCondition("<=");
    }
    if (e.target.value === "совпадение") {
      setCondition("like");
    }
    if (e.target.value === "in") {
      setCondition("in");
    }
  };
  const onChange = (e) => {
    console.log("onChange", e);
    setValue(e.target.value);
    stateScenarios.updateValueFilter(id, f.name, e.target.value, condition, f);
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
      </div>
    );
  } else if (f.info.type === "BIGINT" || f.info.type === "NUMERIC(50, 4)") {
    return (
      <div className="filter_inpt_container">
        <ScenariosInpt
          value={value}
          onChange={onChange}
          placeholder={f.name}
          type="number"
        />{" "}
        {orValue === "И" ? (
          <SelectedConditionFilter
            condition={condition}
            // data={c.condition}
            onChangeCondition={onChangeCondition}
            c={c}
          />
        ) : (
          <span>Точное совпадение</span>
        )}
        <span className="or_btn" onClick={updateOr}>
          {orValue}
        </span>
      </div>
    );
  } else if (f.info.type === "TIMESTAMP") {
    return (
      <div className="filter_inpt_container">
        <ScenariosInpt
          value={value}
          onChange={onChangeDateTime}
          placeholder={f.name}
          type="datetime-local"
        />
        {orValue === "И" ? (
          <SelectedConditionFilter
            condition={condition}
            // data={c.condition}
            onChangeCondition={onChangeCondition}
            c={c}
          />
        ) : (
          <span>Точное совпадение</span>
        )}
        <span className="or_btn" onClick={updateOr}>
          {orValue}
        </span>
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
        {orValue === "И" ? (
          <SelectedConditionFilter
            condition={condition}
            // data={c.condition}
            onChangeCondition={onChangeCondition}
            c={c}
          />
        ) : (
          <span>Точное совпадение</span>
        )}
        <span className="or_btn" onClick={updateOr}>
          {orValue}
        </span>
      </div>
    );
  }
});

export default TypeValue;
