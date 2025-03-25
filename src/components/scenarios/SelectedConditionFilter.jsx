import { observer } from "mobx-react-lite";
import React, { useLayoutEffect } from "react";

const SelectedConditionFilter = observer((props) => {
  useLayoutEffect(() => {
    console.log("SelectedConditionFilter ==> condition ", props.condition);
  }, []);
  return (
    <select
      onChange={(e) => props.onChangeCondition(e)}
      className="inpt_v1_scenarios"
      ref={props.refType}
    >
      <option defaultValue hidden>
        {!props.condition ? "??" : props.condition}
      </option>
      {props.c.condition.map((s) => (
        <option key={s.name}>{s.name}</option>
      ))}
    </select>
  );
});

export default SelectedConditionFilter;
