import { observer } from "mobx-react-lite";
import React from "react";

const SelectedConditionFilter = observer((props) => {
  return (
    <select
      onChange={(e) => props.onChangeCondition(e)}
      className="inpt_v1_scenarios"
    >
      <option defaultValue hidden>
        ??
      </option>
      {props.c.condition.map((s) => (
        <option key={s.name}>{s.name}</option>
      ))}
    </select>
  );
});

export default SelectedConditionFilter;
